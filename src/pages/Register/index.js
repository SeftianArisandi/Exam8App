import React, {useState} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Input, Gap, Loading } from '../../components';
import { colors, useForm } from '../../utills';
import { showMessage } from "react-native-flash-message";
import axios from 'axios';

const Register = ({navigation}) => {
    //const [FullName, setFullName] = useState('');

    const [form, setForm] = useForm({
        name: '',
        email: '',
        phone: '',
        address: ''
    })

    const [loading, setLoading] = useState(false);
  
    const onSubmit = () => {
        setLoading(true);
        console.log(form);
        axios
            .post("http://192.168.1.6:3000/register", form)
            .then(function (response) {   
                setForm('reset');
                setLoading(false);
                navigation.replace('MainApp');
            })
            .catch(function (error) {
                const errorMessage = error.message;
                setLoading(false);
                showMessage({
                    message: errorMessage,
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white,
                    animationDuration: 500
                });
            });
    }

    return (
        <>
            <View style={styles.page}>
                {/* <Header onPress={() => navigation.goBack()} title="Daftar Akun" /> */}
                <View style={styles.content}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Input label="Username" value={form.name} onChangeText={value => setForm('name',value)} />
                        <Gap height={24}/>
                        <Input label="Email" value={form.email} onChangeText={value => setForm('email',value)} />
                        <Gap height={24}/>
                        <Input label="Phone" value={form.phone} onChangeText={value => setForm('phone',value)} />
                        <Gap height={24}/>
                        <Input label="Address" value={form.address} onChangeText={value => setForm('address',value)} />
                        <Gap height={40}/>
                        <Button title="Submit" onPress={onSubmit} />
                    </ScrollView>
                </View>
            </View>
            {loading && <Loading/>}
        </>
    )
}

export default Register;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1,
        paddingTop: 40
    },
    content: {
        padding: 40,
        paddingTop: 0
    }
})
