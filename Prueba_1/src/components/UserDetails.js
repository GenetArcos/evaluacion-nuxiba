import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Descriptions, Space } from 'antd';
import { fetchPostsWithComments, fetchTodos } from '../store/userSlice';

export const UserDetails = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.user);

    if (!selectedUser) return null;

    return (
        <Card title={`Detalles de: ${selectedUser.name}`} style={{ marginTop: 20 }}>
            <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Username">{selectedUser.username}</Descriptions.Item>
                <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
                <Descriptions.Item label="Teléfono">{selectedUser.phone}</Descriptions.Item>
                <Descriptions.Item label="Compañía">{selectedUser.company?.name}</Descriptions.Item>
            </Descriptions>

            <Space style={{ marginTop: 16 }}>
                <Button
                    type="primary"
                    onClick={() => dispatch(fetchPostsWithComments(selectedUser.id))}
                >
                    Ver Posts
                </Button>
                <Button
                    onClick={() => dispatch(fetchTodos(selectedUser.id))}
                >
                    Ver Todos (Tareas)
                </Button>
            </Space>
        </Card>
    );
};