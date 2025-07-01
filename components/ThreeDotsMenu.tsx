import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, IconButton, Divider } from 'react-native-paper';

export default function ChatMenu() {
    const [visible, setVisible] = useState(false);

    return (
        <View className="relative">
            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}

                anchor={
                    <IconButton
                        icon="dots-vertical"
                        size={24}
                        onPress={() => setVisible(true)}
                        style={{ margin: 0 }} // make sure it's aligned right
                    />
                }
                contentStyle={{backgroundColor: "#fff"}}
                anchorPosition="bottom"
            >
                <Menu.Item  onPress={() => console.log('Members')} title="Members" leadingIcon="account-group" />
                <Divider />
                <Menu.Item onPress={() => console.log('Share Number')} title="Share Number" leadingIcon="phone" />
                <Divider />
                <Menu.Item onPress={() => console.log('Report')} title="Report" leadingIcon="alert-circle-outline" />
            </Menu>
        </View>
    );
}
