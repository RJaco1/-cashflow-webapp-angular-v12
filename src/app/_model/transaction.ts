import { Account } from "./account";
import { Category } from "./category";
import { Currency } from "./currency";

export class Transaction {
    transactionId!: number;
    amount!: number;
    date!: string;
    category!: Category;
    currency!: Currency;
    account!: Account;

}