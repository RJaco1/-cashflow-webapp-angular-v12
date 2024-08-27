import { CategoryType } from "./categoryType";
import { UserAccount } from "./userAccount";

export class Category {
    categoryId!: number;
    categoryName!: string;
    categorytype!: CategoryType;
    userAccount!: UserAccount;
}