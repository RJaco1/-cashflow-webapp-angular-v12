import { CategoryType } from "./categoryType";

export class Transaction {
    transactionId!: number;
    amount!: number;
    date!: string;
    categorytype!: CategoryType;
    categoryId!: number;
    categoryName!: string;
    currencyId!: number;
    currency!: string;
    accountId!: number;
    accountName!: string;
    userId!: number;
    username!: string;
    email!: string;
}