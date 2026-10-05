import React from 'react';
import { useSelector } from 'react-redux';
import { Card, List, Avatar, Divider } from 'antd';

export const UserPosts = () => {
    const { posts } = useSelector((state) => state.user);

    return (
        <div style={{ marginTop: 20 }}>
            <h2>Publicaciones del Usuario</h2>
            {posts.map((post) => (
                <Card key={post.id} title={post.title} style={{ marginBottom: 16 }}>
                    <p>{post.body}</p>
                    <Divider orientation="left">Comentarios</Divider>
                    <List
                        dataSource={post.comments}
                        renderItem={(comment) => (
                            <List.Item key={comment.id}>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${comment.id}`} />}
                                    title={`${comment.name} (${comment.email})`}
                                    description={comment.body}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </div>
    );
};