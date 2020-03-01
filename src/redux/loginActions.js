export const CHOOSE_ACCOUNT_TYPE = 'CHOOSE_ACCOUNT_TYPE'

export const chooseAccountType = (accountType) => {

    return {
        type: CHOOSE_ACCOUNT_TYPE,
        accountType: accountType
    }
}
