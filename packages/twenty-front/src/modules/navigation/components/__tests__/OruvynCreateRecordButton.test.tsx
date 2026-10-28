import { OruvynCreateRecordButton } from '@/navigation/components/OruvynCreateRecordButton';
import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { type ObjectPermissionsByObjectMetadataId } from '@/object-metadata/types/ObjectPermissionsByObjectMetadataId';
import { getDefaultObjectPermissions } from '@/object-metadata/utils/getDefaultObjectPermissions';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore, Provider } from 'jotai';
import { getTestEnrichedObjectMetadataItemsMock } from '~/testing/utils/getTestEnrichedObjectMetadataItemsMock';

let mockActiveObjectMetadataItems: EnrichedObjectMetadataItem[] = [];
let mockObjectPermissions: ObjectPermissionsByObjectMetadataId = {};

jest.mock('@/object-metadata/hooks/useFilteredObjectMetadataItems', () => ({
  useFilteredObjectMetadataItems: () => ({
    activeObjectMetadataItems: mockActiveObjectMetadataItems,
  }),
}));

jest.mock('@/object-record/hooks/useObjectPermissions', () => ({
  useObjectPermissions: () => ({
    objectPermissionsByObjectMetadataId: mockObjectPermissions,
  }),
}));

jest.mock('@/navigation/components/OruvynCreateRecordMenuItem', () => {
  const { Dropdown } = jest.requireActual('twenty-ui/components/navigation');

  return {
    OruvynCreateRecordMenuItem: ({
      objectMetadataItem,
    }: {
      objectMetadataItem: EnrichedObjectMetadataItem;
    }) => (
      <Dropdown.ActionItem>
        {objectMetadataItem.labelSingular}
      </Dropdown.ActionItem>
    ),
  };
});

const company = getTestEnrichedObjectMetadataItemsMock().find(
  (objectMetadataItem) => objectMetadataItem.nameSingular === 'company',
)!;

const renderCreateButton = () =>
  render(
    <I18nProvider i18n={i18n}>
      <Provider store={createStore()}>
        <OruvynCreateRecordButton />
      </Provider>
    </I18nProvider>,
  );

describe('OruvynCreateRecordButton', () => {
  beforeEach(() => {
    mockActiveObjectMetadataItems = [];
    mockObjectPermissions = {};
  });

  it('does not offer creation before object metadata is available', () => {
    renderCreateButton();

    expect(
      screen.queryByRole('button', { name: 'Create record' }),
    ).not.toBeInTheDocument();
  });

  it('hides the trigger when the user cannot create any available object', () => {
    mockActiveObjectMetadataItems = [company];
    mockObjectPermissions = {
      [company.id]: {
        ...getDefaultObjectPermissions(company.id),
        canUpdateObjectRecords: false,
      },
    };

    renderCreateButton();

    expect(
      screen.queryByRole('button', { name: 'Create record' }),
    ).not.toBeInTheDocument();
  });

  it('opens an accessible menu with only readable, writable, UI-creatable objects', async () => {
    const user = userEvent.setup();
    const unreadable = {
      ...company,
      id: 'unreadable',
      labelSingular: 'Hidden',
    };
    const readOnly = { ...company, id: 'readonly', labelSingular: 'Read only' };
    const notCreatable = {
      ...company,
      id: 'not-creatable',
      labelSingular: 'System record',
      isUICreatable: false,
    };
    mockActiveObjectMetadataItems = [
      company,
      unreadable,
      readOnly,
      notCreatable,
    ];
    mockObjectPermissions = {
      [company.id]: getDefaultObjectPermissions(company.id),
      [unreadable.id]: {
        ...getDefaultObjectPermissions(unreadable.id),
        canReadObjectRecords: false,
      },
      [readOnly.id]: {
        ...getDefaultObjectPermissions(readOnly.id),
        canUpdateObjectRecords: false,
      },
      [notCreatable.id]: getDefaultObjectPermissions(notCreatable.id),
    };

    renderCreateButton();

    const trigger = screen.getByRole('button', { name: 'Create record' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);

    const menu = within(
      await screen.findByRole('menu', { name: 'Create record' }),
    );
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(
      menu.getByRole('menuitem', { name: company.labelSingular }),
    ).toBeVisible();
    expect(
      menu.queryByRole('menuitem', { name: 'Hidden' }),
    ).not.toBeInTheDocument();
    expect(
      menu.queryByRole('menuitem', { name: 'Read only' }),
    ).not.toBeInTheDocument();
    expect(
      menu.queryByRole('menuitem', { name: 'System record' }),
    ).not.toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
