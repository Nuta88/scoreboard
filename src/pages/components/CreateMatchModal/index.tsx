import React from 'react';

import { Form, Input, Modal } from 'antd';

import { IMatch, Match } from '../../../types';

interface IMatchModalProps {
  isModalOpen: boolean,
  onSave: (match: IMatch) => void,
  onCancel: () => void,
}

type TFormValues = {
  homeTeamName: string,
  awayTeamName: string,
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 32 },
};

const CreateMatchModal: React.FC<IMatchModalProps> = ({ isModalOpen, onSave, onCancel }: IMatchModalProps) => {
  const [form] = Form.useForm();
  
  const onCloseModal = () => {
    form.resetFields();
    onCancel();
  };
  
  const onFinish = (values: TFormValues) => {
    const { awayTeamName, homeTeamName } = values;

    form.resetFields();
    onSave(new Match(homeTeamName, awayTeamName));
  };
  
  return (
    <Modal
      data-testid="create-match-modal"
      title="New Match"
      okText="Add"
      open={isModalOpen}
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        name="match-modal"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Home team"
          name="homeTeamName"
          data-testid="homeTeamName"
          rules={[{ required: true, message: 'Please input Home team!' }]}
        >
          <Input />
        </Form.Item>
    
        <Form.Item
          label="Away team"
          name="awayTeamName"
          data-testid="awayTeamName"
          rules={[{ required: true, message: 'Please input Away team!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default React.memo(CreateMatchModal);
