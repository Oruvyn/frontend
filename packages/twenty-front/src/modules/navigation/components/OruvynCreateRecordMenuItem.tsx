import { getToastOptionsFromError } from '@/error-handler/utils/getToastOptionsFromError';
import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { useCreateNewRecord } from '@/object-record/hooks/useCreateNewRecord';
import { useLingui } from '@lingui/react/macro';
import { capitalize } from 'twenty-shared/utils';
import { useToast } from 'twenty-ui/components/feedback';
import { Dropdown } from 'twenty-ui/components/navigation';
import { useIcons } from 'twenty-ui/icon';

type OruvynCreateRecordMenuItemProps = {
  objectMetadataItem: EnrichedObjectMetadataItem;
};

export const OruvynCreateRecordMenuItem = ({
  objectMetadataItem,
}: OruvynCreateRecordMenuItemProps) => {
  const { t } = useLingui();
  const { getIcon } = useIcons();
  const { enqueueToast } = useToast();
  const { createNewRecord } = useCreateNewRecord({ objectMetadataItem });
  const ObjectIcon = getIcon(objectMetadataItem.icon);
  const objectLabel = capitalize(objectMetadataItem.labelSingular);

  const handleCreateRecord = async () => {
    try {
      await createNewRecord({ position: 'first' });
    } catch (error) {
      enqueueToast(getToastOptionsFromError({ error }));
    }
  };

  return (
    <Dropdown.ActionItem
      startIcon={<ObjectIcon />}
      onClick={handleCreateRecord}
    >
      {t`Create ${objectLabel}`}
    </Dropdown.ActionItem>
  );
};
