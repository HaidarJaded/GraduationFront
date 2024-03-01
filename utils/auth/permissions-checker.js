import {WindowStorage} from "../common";
export function can(permission) {
    const permissions = WindowStorage.get('permission');
    if (permissions){
        return permissions.find(perm => perm.name === permission) !== undefined || permission === '';
    }

}
