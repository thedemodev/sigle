import React from 'react';
import { Story } from '../../../types';
import { SlateEditor } from '../containers/SlateEditor';
import { PageContainer } from '../../home/components/Home';

interface Props {
  loading: boolean;
  story: Story | null;
  onChangeStoryField: (field: string, value: any) => void;
}

export const Editor = ({ loading, story, onChangeStoryField }: Props) => {
  // TODO nice loading
  if (loading) {
    return <PageContainer>Loading ...</PageContainer>;
  }

  // TODO nice 404
  if (!story) {
    return <PageContainer>404 Story not found</PageContainer>;
  }

  return <SlateEditor story={story} onChangeStoryField={onChangeStoryField} />;
};
