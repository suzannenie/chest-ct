import {
    mdiAccount,
    mdiAccountHardHat,
    mdiAccountHardHatOutline,
    mdiAccountOutline,
    mdiCalendar,
    mdiCardsOutline,
    mdiChartArc,
    mdiCog,
    mdiCogRefresh,
    mdiFormatListBulletedType,
    mdiHammerWrench,
    mdiMapMarkerRadius,
    mdiWarehouse,
    mdiPencil,
    mdiClose,
    mdiCheck,
    mdiFilePdfBox,
    mdiDelete,
    mdiFilterVariant,
    mdiDeleteOutline,
    mdiImage,
    mdiFileGifBox,
    mdiFilePngBox,
    mdiFileJpgBox,
    mdiFileWordBox,
    mdiFileExcelBox,
    mdiDownloadCircle,
    mdiDownloadCircleOutline,
    mdiZipBox,
    mdiCommentOutline,
    mdiCloseCircleOutline, mdiBellRing, mdiFormatListText, mdiAccountGroup, mdiShieldLockOpen
} from "@mdi/js";
import i18n from "@/plugins/i18n";
import store from "@/store";

export function checkNull(value) {
    return value ? value : undefined
}

export function getIso(value) {
    let date
    if (value) {
        date = new Date(value*1000)
    } else date = new Date()
    return date.toISOString().slice(0, -8)
}

export function getLocalISO() {
    const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const now = Date.now() - timeZoneOffset //current date in milliseconds
    return new Date(now).toISOString().slice(0, -8)
}

export function getDate(date) {
    if (!date) return null
    try {
        const dateObj = new Date(date)
        return dateObj.toLocaleString('ru-RU', {
            dateStyle: 'medium',
        })
    } catch (e) {
        return null
    }
}

export function getDay(date) {
    if (!date) return null
    try {
        const dateObj = new Date(date)
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
        return dateObj.toLocaleString('ru-RU', options)
    } catch (e) {
        return null
    }
}


export function getMonth(date) {
    if (!date) return null
    try {
        const dateObj = new Date(date)
        const options = { year: 'numeric', month: 'long' }
        return dateObj.toLocaleString('ru-RU', options)
    } catch (e) {
        return null
    }
}


export function getWeek(date) {
    if (!date) return null
    try {
        const dateObj = new Date(date)
        const dayOfMonth = dateObj.getDate()
        const dayOfWeek = dateObj.getDay()
        const correction = dayOfWeek === 0 ? -6 : 1
        const first = new Date(dateObj.setDate(dayOfMonth - dayOfWeek + correction))
        const last = new Date(dateObj.setDate(dayOfMonth - dayOfWeek + correction + 6))
        return `${getDay(first)} - ${getDay(last)}`
    } catch (e) {
        return null
    }
}

export function getDateTime(timestamp) {
    if (!timestamp) return null
    try {
        const date = new Date(timestamp * 1000)
        return date.toLocaleString('ru-RU', {
            dateStyle: 'medium',
            timeStyle: 'short'
        })
    } catch (e) {
        return null
    }
}

export const icons = {
    o: {
        implementer: mdiAccountHardHatOutline,
        reviewer: mdiAccountOutline,
        user: mdiAccountOutline,
        delete: mdiDeleteOutline,
        download: mdiDownloadCircleOutline,
        comment: mdiCommentOutline,
        cancel: mdiCloseCircleOutline,
    },
    permissions: mdiShieldLockOpen,
    logs: mdiFormatListText,
    notifications: mdiBellRing,
    confirm: mdiCheck,
    equipment: mdiHammerWrench,
    implementer: mdiAccountHardHat,
    reviewer: mdiAccount,
    user: mdiAccount,
    users: mdiAccountGroup,
    cards: mdiCardsOutline,
    calendar: mdiCalendar,
    subFacilities: mdiWarehouse,
    facilities: mdiMapMarkerRadius,
    maintenance: mdiFormatListBulletedType,
    scheduled: mdiCogRefresh,
    statistics: mdiChartArc,
    unscheduled: mdiCog,
    edit: mdiPencil,
    error: mdiClose,
    close: mdiClose,
    success: mdiCheck,
    delete: mdiDelete,
    filter: mdiFilterVariant,
    pdf: mdiFilePdfBox,
    image: mdiImage,
    gif: mdiFileGifBox,
    png: mdiFilePngBox,
    jpeg: mdiFileJpgBox,
    msword: mdiFileWordBox,
    excel: mdiFileExcelBox,
    download: mdiDownloadCircle,
    zipbox: mdiZipBox,
}

export function ruleRequired(text = i18n.t('rules.required')) {
    return (value) => !!value || text
}

export function checkDeleted(params) {
    if (!params) params = new URLSearchParams()
    if (!params.has("is_deleted"))
        params.append("is_deleted", "false")
    return params
}

export function getScheduledStatusName(status) {
    switch (status) {
        case scheduledStatuses.NEW:
            return i18n.t("pages.scheduled-maintenance-operations.status.new")
        case scheduledStatuses.ASSIGNED:
            return i18n.t("pages.scheduled-maintenance-operations.status.assigned")
        case scheduledStatuses.IN_PROGRESS:
            return i18n.t("pages.scheduled-maintenance-operations.status.in-progress")
        case scheduledStatuses.IMPOSSIBLE_TO_COMPLETE:
            return i18n.t("pages.scheduled-maintenance-operations.status.impossible-to-complete")
        case scheduledStatuses.LACK_OF_TIME:
            return i18n.t("pages.scheduled-maintenance-operations.status.lack-of-time")
        case scheduledStatuses.DONE:
            return i18n.t("pages.scheduled-maintenance-operations.status.done")
        case scheduledStatuses.APPROVED:
            return i18n.t("pages.scheduled-maintenance-operations.status.approved")
        case scheduledStatuses.CANCELED:
            return i18n.t("pages.scheduled-maintenance-operations.status.cancelled")
        default:
            return status
    }
}

export function getScheduledStatusColor(status) {
    switch (status) {
        case scheduledStatuses.NEW:
            return "info"
        case scheduledStatuses.ASSIGNED:
            return "primary"
        case scheduledStatuses.IN_PROGRESS:
            return ""
        case scheduledStatuses.IMPOSSIBLE_TO_COMPLETE:
            return "error"
        case scheduledStatuses.LACK_OF_TIME:
            return "error"
        case scheduledStatuses.DONE:
            return "success"
        case scheduledStatuses.APPROVED:
            return "success"
        case scheduledStatuses.CANCELED:
            return "secondary"
        default:
            return ""
    }
}

export const scheduledStatuses = {
    NEW: "NEW",
    ASSIGNED: "ASSIGNED",
    IN_PROGRESS: "IN_PROGRESS",
    LACK_OF_TIME: "LACK_OF_TIME",
    IMPOSSIBLE_TO_COMPLETE: "IMPOSSIBLE_TO_COMPLETE",
    APPROVED: "APPROVED",
    CANCELED: "CANCELED",
    DONE: "DONE",
}

export function getFilterItemsForScheduledStatus() {
    return Object.keys(scheduledStatuses).map(key=> ({
        value: key,
        text: getScheduledStatusName(key)
    }))
}

export function getNextScheduledStatuses(status) {
    const s = []
    switch (status) {
        case scheduledStatuses.NEW:
            if (canFunction(vp.SCHEDULED_MAINTENANCE_OPERATIONS_ASSIGN))
                s.push(scheduledStatuses.ASSIGNED)
            return s
        case scheduledStatuses.ASSIGNED:
            if (canFunction(vp.SCHEDULED_MAINTENANCE_OPERATIONS_IN_PROGRESS))
                s.push(scheduledStatuses.IN_PROGRESS)
            return s
        case scheduledStatuses.IN_PROGRESS:
            if (canFunction(vp.SCHEDULED_MAINTENANCE_OPERATIONS_DONE))
                s.push(scheduledStatuses.DONE)
            if (canFunction(vp.SCHEDULED_MAINTENANCE_OPERATIONS_LACK_OF_TIME))
                s.push(scheduledStatuses.LACK_OF_TIME)
            if (canFunction(vp.SCHEDULED_MAINTENANCE_OPERATIONS_IMPOSSIBLE_TO_COMPLETE))
                s.push(scheduledStatuses.IMPOSSIBLE_TO_COMPLETE)
            return s
        case scheduledStatuses.IMPOSSIBLE_TO_COMPLETE:
            if (canFunction(vp.SCHEDULED_MAINTENANCE_OPERATIONS_ASSIGN))
                s.push(scheduledStatuses.ASSIGNED)
            if (canFunction(vp.SCHEDULED_MAINTENANCE_OPERATIONS_CANCELED))
                s.push(scheduledStatuses.CANCELED)
            return s
        case scheduledStatuses.LACK_OF_TIME:
            if (canFunction(vp.SCHEDULED_MAINTENANCE_OPERATIONS_ASSIGN))
                s.push(scheduledStatuses.ASSIGNED)
            if (canFunction(vp.SCHEDULED_MAINTENANCE_OPERATIONS_CANCELED))
                s.push(scheduledStatuses.CANCELED)
            return s
        case scheduledStatuses.DONE:
            if (canFunction(vp.SCHEDULED_MAINTENANCE_OPERATIONS_APPROVED))
                s.push(scheduledStatuses.APPROVED)
            if (canFunction(vp.SCHEDULED_MAINTENANCE_OPERATIONS_CANCELED))
                s.push(scheduledStatuses.CANCELED)
            return s
        case scheduledStatuses.APPROVED:
            return s
        case scheduledStatuses.CANCELED:
            return s
        default:
            return s
    }
}

export const unscheduledStatuses = {
    NEW: "NEW",
    IN_PROGRESS: "IN_PROGRESS",
    POSTPONED: "POSTPONED",
    DONE: "DONE",
    CLOSED: "CLOSED",
}

export function getNextUnscheduledStatus(status) {
    const s = []
    switch (status) {
        case unscheduledStatuses.NEW:
            if (canFunction(vp.UNSCHEDULED_MAINTENANCE_IN_PROGRESS))
                s.push(unscheduledStatuses.IN_PROGRESS)
            return s
        case unscheduledStatuses.IN_PROGRESS:
            if (canFunction(vp.UNSCHEDULED_MAINTENANCE_DONE))
                s.push(unscheduledStatuses.DONE)
            if (canFunction(vp.UNSCHEDULED_MAINTENANCE_POSTPONE))
                s.push(unscheduledStatuses.POSTPONED)
            return s
        case unscheduledStatuses.POSTPONED:
            if (canFunction(vp.UNSCHEDULED_MAINTENANCE_DONE))
                s.push(unscheduledStatuses.DONE)
            return s
        case unscheduledStatuses.DONE:
            if (canFunction(vp.UNSCHEDULED_MAINTENANCE_CLOSE))
                s.push(unscheduledStatuses.CLOSED)
            return s
        case unscheduledStatuses.CLOSED:
            return s
        default:
            return s
    }
}


export function getUnscheduledStatusName(status) {
    switch (status) {
        case unscheduledStatuses.NEW:
            return i18n.t("pages.unscheduled-maintenance.status.new")
        case unscheduledStatuses.IN_PROGRESS:
            return i18n.t("pages.unscheduled-maintenance.status.in-progress")
        case unscheduledStatuses.POSTPONED:
            return i18n.t("pages.unscheduled-maintenance.status.postponed")
        case unscheduledStatuses.DONE:
            return i18n.t("pages.unscheduled-maintenance.status.done")
        case unscheduledStatuses.CLOSED:
            return i18n.t("pages.unscheduled-maintenance.status.closed")
        default:
            return status
    }
}

export function getUnscheduledStatusColor(status) {
    switch (status) {
        case unscheduledStatuses.NEW:
            return "primary"
        case unscheduledStatuses.IN_PROGRESS:
            return "info"
        case unscheduledStatuses.POSTPONED:
            return "warning"
        case unscheduledStatuses.DONE:
            return "success"
        case unscheduledStatuses.CLOSED:
            return ""
        default:
            return ""
    }
}

export function getFilterItemsForUnscheduledStatus() {
    return Object.keys(unscheduledStatuses).map(key=> ({
        value: key,
        text: getUnscheduledStatusName(key)
    }))
}

export function urlBase64ToUint8Array (base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray;
}

export function loadVersionBrowser () {
    if ("userAgentData" in navigator) {
        // navigator.userAgentData is not available in
        // Firefox and Safari
        const uaData = navigator.userAgentData;
        // Outputs of navigator.userAgentData.brands[n].brand are e.g.
        // Chrome: 'Google Chrome'
        // Edge: 'Microsoft Edge'
        // Opera: 'Opera'
        let browsername;
        let browserversion;
        let chromeVersion = null;
        for (let i = 0; i < uaData.brands.length; i++) {
            let brand = uaData.brands[i].brand;
            browserversion = uaData.brands[i].version;
            if (brand.match(/opera|chrome|edge|safari|firefox|msie|trident/i) !== null) {
                // If we have a chrome match, save the match, but try to find another match
                // E.g. Edge can also produce a false Chrome match.
                if (brand.match(/chrome/i) !== null) {
                    chromeVersion = browserversion;
                }
                // If this is not a chrome match return immediately
                else {
                    browsername = brand.substr(brand.indexOf(' ')+1);
                    return {
                        name: browsername,
                        version: browserversion
                    }
                }
            }
        }
        // No non-Chrome match was found. If we have a chrome match, return it.
        if (chromeVersion !== null) {
            return {
                name: "chrome",
                version: chromeVersion
            }
        }
    }
    // If no userAgentData is not present, or if no match via userAgentData was found,
    // try to extract the browser name and version from userAgent
    const userAgent = navigator.userAgent;
    let ua = userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name: 'IE', version: (tem[1] || '')};
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return {name: 'Opera', version: tem[1]};
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: M[1]
    };
}

export function base64toFile(base64Data, name, contentType) {
    contentType = contentType || "";
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);

        const bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new File(byteArrays, name, { type: contentType });
}

export const workModes = [{
    value: 'DAY',
    text: i18n.t('work-modes.day')
}, {
    value: 'NIGHT',
    text: i18n.t('work-modes.night')
}]

export function generateArray(start, stop, step = 1) {
    return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
}

export const responseStatuses = {
    OK: "OK",
    CLIENT_ERROR: "CLIENT_ERROR",
    SERVER_ERROR: "SERVER_ERROR",
    UNKNOWN_ERROR: "UNKNOWN_ERROR"
}

export const userRoles = {
    ADMIN: "Администратор",
    REVIEW: "Контроль",
    PTO: "ПТО",
    ITR: "ИТР",
    EXPLOITER: "Эксплуатация",
    EXECUTOR: "Исполнитель",
}

export function canFunction(permission) {
    if (!permission) return true
    return store.getters['User/hasMasterPermission']
    || store.getters['User/getPermissions']
        .map(({value})=>value)
        .includes(permission)
}


export const vp = {
    MASTER: 1,
    AUTHORIZATION: "AUTHORIZATION",
    PAGE_CARDS: "PAGE_CARDS",
    CARDS_DETAILS: "CARDS_DETAILS",
    CARDS_DELETED: "CARDS_DELETED",
    CARDS_LACK_OF_TIME: "CARDS_LACK_OF_TIME",
    CARDS_IMPOSSIBLE_TO_COMPLETE: "CARDS_IMPOSSIBLE_TO_COMPLETE",
    PAGE_CALENDAR: "PAGE_CALENDAR",
    PAGE_USERS: "PAGE_USERS",
    USERS_PERMISSIONS: "USERS_PERMISSIONS",
    USERS_SUB_FACILITIES: "USERS_SUB_FACILITIES",
    USERS_UPLOAD: "USERS_UPLOAD",
    USERS_DELETE: "USERS_DELETE",
    USERS_EDIT: "USERS_EDIT",
    USERS_ADD: "USERS_ADD",
    USERS_DELETED: "USERS_DELETED",
    PAGE_FACILITIES: "PAGE_FACILITIES",
    FACILITIES_EDIT: "FACILITIES_EDIT",
    FACILITIES_DELETE: "FACILITIES_DELETE",
    FACILITIES_ADD: "FACILITIES_ADD",
    FACILITIES_UPLOAD: "FACILITIES_UPLOAD",
    FACILITIES_DELETED: "FACILITIES_DELETED",
    PAGE_SUB_FACILITIES: "PAGE_SUB_FACILITIES",
    SUB_FACILITIES_EDIT: "SUB_FACILITIES_EDIT",
    SUB_FACILITIES_DELETE: "SUB_FACILITIES_DELETE",
    SUB_FACILITIES_ADD: "SUB_FACILITIES_ADD",
    SUB_FACILITIES_UPLOAD: "SUB_FACILITIES_UPLOAD",
    SUB_FACILITIES_DELETED: "SUB_FACILITIES_DELETED",
    PAGE_MAINTENANCE_TYPES: "PAGE_MAINTENANCE_TYPES",
    MAINTENANCE_TYPES_EDIT: "MAINTENANCE_TYPES_EDIT",
    MAINTENANCE_TYPES_DELETE: "MAINTENANCE_TYPES_DELETE",
    MAINTENANCE_TYPES_ADD: "MAINTENANCE_TYPES_ADD",
    MAINTENANCE_TYPES_UPLOAD: "MAINTENANCE_TYPES_UPLOAD",
    MAINTENANCE_TYPES_DELETED: "MAINTENANCE_TYPES_DELETED",
    MAINTENANCE_TYPES_OPERATIONS: "MAINTENANCE_TYPES_OPERATIONS",
    MAINTENANCE_TYPES_OPERATIONS_ADD: "MAINTENANCE_TYPES_OPERATIONS_ADD",
    MAINTENANCE_TYPES_OPERATIONS_EDIT: "MAINTENANCE_TYPES_OPERATIONS_EDIT",
    MAINTENANCE_TYPES_OPERATIONS_DELETE: "MAINTENANCE_TYPES_OPERATIONS_DELETE",
    MAINTENANCE_TYPES_OPERATIONS_DELETED: "MAINTENANCE_TYPES_OPERATIONS_DELETED",
    PAGE_EQUIPMENT: "PAGE_EQUIPMENT",
    EQUIPMENT_EDIT: "EQUIPMENT_EDIT",
    EQUIPMENT_DELETE: "EQUIPMENT_DELETE",
    EQUIPMENT_ADD: "EQUIPMENT_ADD",
    EQUIPMENT_UPLOAD: "EQUIPMENT_UPLOAD",
    EQUIPMENT_DELETED: "EQUIPMENT_DELETED",
    PAGE_EQUIPMENT_PIECE: "PAGE_EQUIPMENT_PIECE",
    EQUIPMENT_PIECE_DOCS_META: "EQUIPMENT_PIECE_DOCS_META",
    EQUIPMENT_PIECE_DOCS_VIEW: "EQUIPMENT_PIECE_DOCS_VIEW",
    EQUIPMENT_PIECE_DOCS_DOWNLOAD: "EQUIPMENT_PIECE_DOCS_DOWNLOAD",
    EQUIPMENT_PIECE_DOCS_DOWNLOAD_ALL: "EQUIPMENT_PIECE_DOCS_DOWNLOAD_ALL",
    EQUIPMENT_PIECE_DOCS_EDIT: "EQUIPMENT_PIECE_DOCS_EDIT",
    EQUIPMENT_PIECE_DOCS_DELETE: "EQUIPMENT_PIECE_DOCS_DELETE",
    EQUIPMENT_PIECE_DOCS_ADD: "EQUIPMENT_PIECE_DOCS_ADD",
    EQUIPMENT_PIECE_DOCS_DELETED: "EQUIPMENT_PIECE_DOCS_DELETED",
    PAGE_UNSCHEDULED_MAINTENANCE: "PAGE_UNSCHEDULED_MAINTENANCE",
    UNSCHEDULED_MAINTENANCE_EDIT: "UNSCHEDULED_MAINTENANCE_EDIT",
    UNSCHEDULED_MAINTENANCE_DELETE: "UNSCHEDULED_MAINTENANCE_DELETE",
    UNSCHEDULED_MAINTENANCE_ADD: "UNSCHEDULED_MAINTENANCE_ADD",
    UNSCHEDULED_MAINTENANCE_UPLOAD: "UNSCHEDULED_MAINTENANCE_UPLOAD",
    UNSCHEDULED_MAINTENANCE_DELETED: "UNSCHEDULED_MAINTENANCE_DELETED",
    UNSCHEDULED_MAINTENANCE_DONE: "UNSCHEDULED_MAINTENANCE_DONE",
    UNSCHEDULED_MAINTENANCE_POSTPONE: "UNSCHEDULED_MAINTENANCE_POSTPONE",
    UNSCHEDULED_MAINTENANCE_CLOSE: "UNSCHEDULED_MAINTENANCE_CLOSE",
    UNSCHEDULED_MAINTENANCE_IN_PROGRESS: "UNSCHEDULED_MAINTENANCE_IN_PROGRESS",
    PAGE_SCHEDULED_MAINTENANCE: "PAGE_SCHEDULED_MAINTENANCE",
    SCHEDULED_MAINTENANCE_DELETED: "SCHEDULED_MAINTENANCE_DELETED",
    SCHEDULED_MAINTENANCE_UPLOAD: "SCHEDULED_MAINTENANCE_UPLOAD",
    SCHEDULED_MAINTENANCE_ASSIGN: "SCHEDULED_MAINTENANCE_ASSIGN",
    SCHEDULED_MAINTENANCE_REPORT: "SCHEDULED_MAINTENANCE_REPORT",
    SCHEDULED_MAINTENANCE_POSTPONE: "SCHEDULED_MAINTENANCE_POSTPONE",
    PAGE_STATISTICS: "PAGE_STATISTICS",
    PAGE_SCHEDULED_MAINTENANCE_OPERATIONS: "PAGE_SCHEDULED_MAINTENANCE_OPERATIONS",
    SCHEDULED_MAINTENANCE_OPERATIONS_EDIT: "SCHEDULED_MAINTENANCE_OPERATIONS_EDIT",
    SCHEDULED_MAINTENANCE_OPERATIONS_DELETED: "SCHEDULED_MAINTENANCE_OPERATIONS_DELETED",
    SCHEDULED_MAINTENANCE_OPERATIONS_ASSIGN: "SCHEDULED_MAINTENANCE_OPERATIONS_ASSIGN",
    SCHEDULED_MAINTENANCE_OPERATIONS_ASSIGN_REVIEW: "SCHEDULED_MAINTENANCE_OPERATIONS_ASSIGN_REVIEW",
    SCHEDULED_MAINTENANCE_OPERATIONS_IN_PROGRESS: "SCHEDULED_MAINTENANCE_OPERATIONS_IN_PROGRESS",
    SCHEDULED_MAINTENANCE_OPERATIONS_LACK_OF_TIME: "SCHEDULED_MAINTENANCE_OPERATIONS_LACK_OF_TIME",
    SCHEDULED_MAINTENANCE_OPERATIONS_IMPOSSIBLE_TO_COMPLETE: "SCHEDULED_MAINTENANCE_OPERATIONS_IMPOSSIBLE_TO_COMPLETE",
    SCHEDULED_MAINTENANCE_OPERATIONS_APPROVED: "SCHEDULED_MAINTENANCE_OPERATIONS_APPROVED",
    SCHEDULED_MAINTENANCE_OPERATIONS_CANCELED: "SCHEDULED_MAINTENANCE_OPERATIONS_CANCELED",
    SCHEDULED_MAINTENANCE_OPERATIONS_DONE: "SCHEDULED_MAINTENANCE_OPERATIONS_DONE",
    EQUIPMENT_NOTIFICATION_SETTINGS: "EQUIPMENT_NOTIFICATION_SETTINGS",
    EQUIPMENT_NOTIFICATION_SETTINGS_EDIT: "EQUIPMENT_NOTIFICATION_SETTINGS_EDIT",
    EQUIPMENT_NOTIFICATION_SETTINGS_DELETED: "EQUIPMENT_NOTIFICATION_SETTINGS_DELETED",
    USER_GROUPS: "USER_GROUPS",
    USER_GROUPS_EDIT: "USER_GROUPS_EDIT",
    USER_GROUPS_DELETED: "USER_GROUPS_DELETED",
    USER_GROUPS_EDIT_PERMISSIONS: "USER_GROUPS_EDIT_PERMISSIONS",
    NOTIFICATION_SETTINGS: "NOTIFICATION_SETTINGS",
    NOTIFICATION_SETTINGS_EDIT: "NOTIFICATION_SETTINGS_EDIT",
    NOTIFICATION_SETTINGS_DELETED: "NOTIFICATION_SETTINGS_DELETED",
    ALL_INFRASTRUCTURE: "ALL_INFRASTRUCTURE",
    RECEIVE_NOTIFICATIONS: "RECEIVE_NOTIFICATIONS",
    PAGE_LOGS: "PAGE_LOGS",
    PAGE_USER_GROUPS: "PAGE_USER_GROUPS",
}