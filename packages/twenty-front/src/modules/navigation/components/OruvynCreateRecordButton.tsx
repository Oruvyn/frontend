import { OruvynCreateRecordMenuItem } from '@/navigation/components/OruvynCreateRecordMenuItem';
import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { getObjectPermissionsForObject } from '@/object-metadata/utils/getObjectPermissionsForObject';
import { useObjectPermissions } from '@/object-record/hooks/useObjectPermissions';
import { canCreateRecordsForObjectMetadataItem } from '@/object-record/utils/canCreateRecordsForObjectMetadataItem';
import { DropdownContent } from '@/ui/layout/dropdown/components/DropdownContent';
import { DropdownRoot } from '@/ui/layout/dropdown/components/DropdownRoot';
import { useLingui } from '@lingui/react/macro';
import { LightIconButton } from 'twenty-ui/components/input';
import { Dropdown } from 'twenty-ui/components/navigation';
import { IconPlus } from 'twenty-ui/icon';

type OruvynCreateRecordButtonProps = {
  size?: 'sm' | 'md';
};

export const OruvynCreateRecordButton = ({
  size = 'sm',
}: OruvynCreateRecordButtonProps) => {
  const { t } = useLingui();
  const { activeObjectMetadataItems } = useFilteredObjectMetadataItems();
  const { objectPermissionsByObjectMetadataId } = useObjectPermissions();
  const creatableObjectMetadataItems = activeObjectMetadataItems.filter(
    (objectMetadataItem) => {
      const objectPermissions = getObjectPermissionsForObject(
        objectPermissionsByObjectMetadataId,
        objectMetadataItem.id,
      );

      return (
        objectPermissions.canReadObjectRecords &&
        canCreateRecordsForObjectMetadataItem({
          objectMetadataItem,
          objectPermissions,
        })
      );
    },
  );

  if (creatableObjectMetadataItems.length === 0) {
    return null;
  }

  return (
    <DropdownRoot dropdownId="oruvyn-create-record" type="menu">
      <Dropdown.Trigger
        render={
          <LightIconButton size={size} aria-label={t`Create record`}>
            <IconPlus />
          </LightIconButton>
        }
      />
      <DropdownContent align="start" aria-label={t`Create record`}>
        <Dropdown.Section>
          {creatableObjectMetadataItems.map((objectMetadataItem) => (
            <OruvynCreateRecordMenuItem
              key={objectMetadataItem.id}
              objectMetadataItem={objectMetadataItem}
            />
          ))}
        </Dropdown.Section>
      </DropdownContent>
    </DropdownRoot>
  );
};
