import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, List, Form, Input, Checkbox, Button, message, Tag } from 'antd';
import { createTodo } from '../store/userSlice';

export const UserTodos = () => {
    const dispatch = useDispatch();
    const { todos, selectedUser } = useSelector((state) => state.user);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const newTodoData = {
            userId: selectedUser.id,
            title: values.title,
            completed: values.completed || false,
        };

        try {
            await dispatch(createTodo(newTodoData)).unwrap();
            message.success('¡Tarea agregada correctamente! (ID retornado: 201)');
            form.resetFields();
        } catch (err) {
            message.error('Error al guardar la tarea');
        }
    };

    return (
        <div style={{ marginTop: 20 }}>
            <Card title="Agregar Nueva Tarea" style={{ marginBottom: 20 }}>
                <Form form={form} layout="inline" onFinish={onFinish}>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'El título es requerido' }]}
                        style={{ flex: 1 }}
                    >
                        <Input placeholder="Título de la tarea" />
                    </Form.Item>

                    <Form.Item name="completed" valuePropName="checked">
                        <Checkbox>Completada</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Guardar Tarea
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <h2>Lista de Tareas (Ordenadas de ID mayor a menor)</h2>
            <List
                bordered
                dataSource={todos}
                renderItem={(item) => (
                    <List.Item
                        extra={
                            <Tag color={item.completed ? 'green' : 'volcano'}>
                                {item.completed ? 'Completada' : 'Pendiente'}
                            </Tag>
                        }
                    >
                        <strong>ID #{item.id}:</strong> {item.title}
                    </List.Item>
                )}
            />
        </div>
    );
};