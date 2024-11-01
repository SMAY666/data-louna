import {PurchaseModel} from '../modules/purchases/model';
import {UserModel} from '../modules/user/model';


void UserModel.hasMany(PurchaseModel, {foreignKey: 'userId', as: 'purchases'});