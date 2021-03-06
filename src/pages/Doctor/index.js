import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, DoctorCategory, Gap, HomeProfile, Input, Loading, NewsItem, RatedDoctor } from '../../components';
import { colors, fonts } from '../../utills';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const Doctor = () => {
    // data users
    const [choose, setChoose] = useState('off');
    const [users, setUsers] = useState();

    if(choose === 'off'){
        // console.log('choose jalan');
        for(let i=0; i<=1; i++){
            useEffect(() => {
                userList();
            }, [loading]);
        }
    }

    // form input
    const [type, setType] = useState('');
    const [keyword, setKeyword] = useState('');

    // loading animation
    const [loading, setLoading] = useState(false);

    const onSearch = () => {
        setLoading(true);
        //setChoose('on');
        const sendData = ({
            type: type,
            keyword: keyword
        });
        // console.log(sendData);
        axios
            .post("http://192.168.1.6:3000/filter", sendData)
            .then(async function (response) {   
                // console.log(response.data);
                await setUsers(response.data);
                // console.log(users);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
            });
    }

    const userList = () => {
        // console.log('userList jalan');
        axios
            .get("http://192.168.1.6:3000/users")
            .then(function (response) {
                setUsers(response.data);
                // console.log(users);
            })
            .catch(function (error) {
                const errorMessage = error.message;
                showMessage({
                    message: errorMessage,
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white,
                    animationDuration: 500
                });
            })
    }

    return (
        <>
            <View style={styles.page}>
                <View style={styles.content}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={styles.wrapperSection}>
                            <Gap height={20}/>
                            <Picker
                                selectedValue={type}
                                onValueChange={(itemValue) => setType(itemValue)}>
                                <Picker.Item label="Email" value="email" />
                                <Picker.Item label="Phone" value="phone" />
                                <Picker.Item label="Address" value="address" />
                            </Picker>
                            <Gap height={20}/>
                            <Input label="Keyword" value={keyword} onChangeText={value => setKeyword(value)} />
                            <Gap height={20}/>
                            <Button title="Search" onPress={onSearch} />
                            <Text style={styles.sectionLabel}>Daftar Pengguna</Text>
                            {users && users.map((user, index) => (
                                <RatedDoctor
                                    key={index}
                                    name={user.name}
                                    email={user.email}
                                    phone={user.phone}
                                    address={user.address}
                                />
                            ))}
                        </View>
                        <Gap height={30} />
                    </ScrollView>
                </View>
            </View>
            {loading && <Loading/>}
        </>
    )
}

export default Doctor;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.secondary,
        flex : 1
    },
    content: {
        backgroundColor: colors.white,
        flex : 1,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    welcome: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginBottom: 16,
        maxWidth: 210
    },
    category: {
        flexDirection: 'row'
    },
    wrapperScroll: {
        marginHorizontal: -16
    },
    wrapperSection: {
        paddingHorizontal: 16
    },
    sectionLabel: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginBottom: 16
    }
})
