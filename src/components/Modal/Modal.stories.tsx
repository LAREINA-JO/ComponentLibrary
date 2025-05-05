import React from 'react';
import type { StoryObj, Meta } from '@storybook/react';
import { Modal, Button } from '@/index';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'components/modal/Modal',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    onClose: { control: false },
    children: { control: false },
  },
  args: {
    open: false,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalExample = () => {
  const [open, setOpen] = React.useState(false);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={onOpenModal}>Open Modal</Button>
      <Modal open={open} onClose={onCloseModal}>
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
      </Modal>
    </>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const modalExample: Story = {
  render: () => <ModalExample />,
};
