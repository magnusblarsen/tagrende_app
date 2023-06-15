import { View, Button, TextInput } from 'react-native'
import { useState } from 'react'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
  return (
    <View>
        <TextInput
            placeholder='name'
            onChangeText={setName} 
        />
        <TextInput
            placeholder='email'
            onChangeText={setName} 
        />
        <TextInput
            placeholder='password'
            secureTextEntry={true}
            onChangeText={setName} 
        />
    </View>
  )
}
