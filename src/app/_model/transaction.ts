import { Account } from "./account";
import { Category } from "./category";
import { Currency } from "./currency";
import { UserAccount } from "./userAccount";

export class Transaction {
    transactionId!: number;
    amount!: number;
    date!: string;
    category!: Category;
    currency!: Currency;
    account!: Account;
    userAccount!: UserAccount;

}