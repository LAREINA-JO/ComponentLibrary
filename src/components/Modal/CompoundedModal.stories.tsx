import React from 'react';
import type { StoryObj, Meta } from '@storybook/react';
import { Button } from '@/index';
import CompoundedModal, {
  CompoundedModalTrigger,
  CompoundedModalWindow,
} from './CompoundedModal';

const meta: Meta<typeof CompoundedModal> = {
  component: CompoundedModal,
  title: 'components/modal/CompoundedModal',
  decorators: [(story) => <CompoundedModal>{story()}</CompoundedModal>],
  // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CompoundedModal>;

type ModalContentProps = JSX.IntrinsicElements['div'] & {
  onCloseModal?: () => void;
};

const ModalContent = ({ onCloseModal }: ModalContentProps) => {
  return (
    <>
      <h2 className="bold text-2xl">Hello, World!</h2>
      <p className="">
        This is a modal window. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nulla voluptas illum veritatis libero itaque illo
        tempora tenetur quos totam reiciendis assumenda, dignissimos ratione
        ipsa sint officia dolorem voluptate? Ducimus, provident?
      </p>
      <div className="flex justify-end space-x-5">
        <Button>Submit</Button>
        <Button
          onClick={onCloseModal}
          className="bg-slate-400 hover:bg-slate-500"
        >
          Close
        </Button>
      </div>
    </>
  );
};

const ModalExample = () => {
  return (
    <CompoundedModal>
      <CompoundedModalTrigger modalName="example">
        <Button>Open Modal</Button>
      </CompoundedModalTrigger>
      <CompoundedModalWindow modalName="example" className="">
        <ModalContent />
      </CompoundedModalWindow>
    </CompoundedModal>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const modalExample: Story = {
  render: () => ModalExample(),
};
