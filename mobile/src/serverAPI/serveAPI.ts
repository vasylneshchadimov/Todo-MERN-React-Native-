import axios from "axios";
import TodoService from "../sevrises/todoServise";

import Constants from 'expo-constants';
import { AppConfig } from '../../app.config';
import UserService from "../sevrises/userServise";

const { SERVER_URL, URL_TODO_API, URL_USER_API} = Constants.manifest?.extra as AppConfig;


export const todoService = new TodoService( SERVER_URL, axios, URL_TODO_API);
export const userService = new UserService(SERVER_URL, axios, URL_USER_API);