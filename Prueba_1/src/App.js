import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Select, Spin, Row, Col } from 'antd';
import { fetchUsers, setSelectedUser } from './store/userSlice';
import { UserDetails } from './components/UserDetails';
import { UserPosts } from './components/UserPosts';
import { UserTodos } from './components/UserTodos';

const { Header, Content } = Layout;
const { Option } = Select;

export default function App() {
    const dispatch = useDispatch();
    const { users, selectedUser, activeTab, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSelectUser = (userId) => {
        const user = users.find((u) => u.id === userId);
        dispatch(setSelectedUser(user));
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
                Evaluacion Tecnica - Nuxiba
            </Header>
            <Content style={{ padding: '30px 50px' }}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <label style={{ marginRight: 10, fontWeight: 'bold' }}>
                            Seleccionar Usuario:
                        </label>
                        <Select
                            placeholder="Elige un usuario"
                            style={{ width: 300 }}
                            onChange={handleSelectUser}
                            loading={loading}
                        >
                            {users.map((user) => (
                                <Option key={user.id} value={user.id}>
                                    {user.name} (@{user.username})
                                </Option>
                            ))}
                        </Select>
                    </Col>
                </Row>

                {loading && <Spin style={{ marginTop: 20 }} size="large" />}

                {selectedUser && <UserDetails />}

                {activeTab === 'posts' && <UserPosts />}
                {activeTab === 'todos' && <UserTodos />}
            </Content>
        </Layout>
    );
}