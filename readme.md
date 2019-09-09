# Paddy

University project made by Vladyslav Bozhko and Olha Kirdiaieva

![Paddy](https://github.com/drakosvlad/paddy/blob/master/resources/images/Paddy_Shrink.png?raw=true)

## About Paddy

Paddy is a compact cloud-based password manager. It allows you to store your passwords easily and access them from any device. Access to your passwords is protected with the use of end-to-end encryption and one-time password (OTP) technology.

## Some implementation details

The frontend is built with the use of Vue.js framework, combined with Vuex state manager and Vue-router. Server-side is made with the help of the Laravel framework.

## Some security details

All the user data is encrypted using the AES-256 algorithm and is sent to the server in the encrypted format. Before any password is decrypted, a client is being asked for a one-time code.
