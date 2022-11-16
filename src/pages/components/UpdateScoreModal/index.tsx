import React from 'react';

import { Form, InputNumber, Modal } from 'antd';

import { IMatch } from '../../../types';

interface IMatchModalProps {
  isModalOpen: boolean,
  match: IMatch,
  onUpdate: (match: IMatch) => void,
  onCancel: () => void,
}

type TFormValues = {
  homeTeamPoints: number,
  awayTeamPoints: number,
}

const layout = {
  labelCol: { span: 14 },
  wrapperCol: { span: 24 },
};

const UpdateScoreModal: React.FC<IMatchModalProps> = ({ isModalOpen, match, onUpdate, onCancel }: IMatchModalProps) => {
  const [form] = Form.useForm();
  
  const onCloseModal = () => {
    form.resetFields();
    onCancel();
  };
  
  const onFinish = (values: TFormValues) => {
    onUpdate({...match, ...values})
    form.resetFields();
  };
  
  return (
    <Modal
      data-testid="update-score-modal"
      title="Update score"
      okText="Update"
      open={isModalOpen}
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        name="update-score-modal"
        autoComplete="off"
        onFinish={onFinish}
        initialValues={{
          homeTeamPoints: match?.homeTeamPoints,
          awayTeamPoints: match?.awayTeamPoints,
        }}
      >
        <Form.Item
          label={`Home points (${match?.homeTeamName})`}
          name="homeTeamPoints"
          rules={[{ required: true, message: 'Please input Home team points!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
    
        <Form.Item
          label={`Away points (${match?.awayTeamName})`}
          name="awayTeamPoints"
          rules={[{ required: true, message: 'Please input Away team points!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default React.memo(UpdateScoreModal);
