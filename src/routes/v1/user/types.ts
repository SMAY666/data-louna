import {UserAttributes} from '../../../modules/user/model/types';


export type ChangePasswordRequest = {
    Body: {
        oldPassword: string
        newPassword: string
    },
    Reply: UserAttributes
}