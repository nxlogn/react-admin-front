import { Form, Input } from 'antd';
import { useEffect } from 'react';

// 封装添加和修改的组件
function AddUpdateForm({ categoryName, onFormInstanceReady }) {
    const [form] = Form.useForm();
    // 将form实例传递给父组件
    useEffect(() => {
        if (onFormInstanceReady) {
            onFormInstanceReady(form);
        }
    }, [form, onFormInstanceReady]);

    // 当categoryName变化时，设置表单值
    useEffect(() => {
        if (categoryName) {
            form.setFieldsValue({ categoryName });
        }
    }, [categoryName, form]);

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{ categoryName }}
        >
            <Form.Item
                name="categoryName"
                label="分类名称"
                rules={[
                    {
                        required: true,
                        message: '分类名称必须输入'
                    }
                ]}
            >
                <Input placeholder='请输入分类名称' />
            </Form.Item>
        </Form>
    );
}

export default AddUpdateForm;
