export function getMatchedKeyboardChar(charCode: number, key: KeyboardEvent, isArabic: boolean) {
    let matchedCharacter = '';
    let typedCharacter = '';
    switch (charCode) {
        case 101:
            if (String.fromCharCode(charCode) == 'E') {
                matchedCharacter = 'ث';
                typedCharacter = CheckCapsLock(key) ? 'E' : 'e';
            } else {
                return '';
            }
            break;
        case 98:
            if (String.fromCharCode(charCode) == 'B') {
                matchedCharacter = 'لا';
                typedCharacter = CheckCapsLock(key) ? 'B' : 'b';
            } else {
                return '';
            }
            break;
        case 99:
            if (String.fromCharCode(charCode) == 'C') {
                matchedCharacter = 'ؤ';
                typedCharacter = CheckCapsLock(key) ? 'C' : 'c';
                break;
            }
            return '';
        case 100:
            if (String.fromCharCode(charCode) == 'D') {
                matchedCharacter = 'ي';
                typedCharacter = CheckCapsLock(key) ? 'D' : 'd';
            } else {
                return '';
            }
            break;
        case 104:
            if (String.fromCharCode(charCode) == 'H') {
                matchedCharacter = 'ا';
                typedCharacter = CheckCapsLock(key) ? 'H' : 'h';
            } else {
                return '';
            }
            break;
        case 103:
            if (String.fromCharCode(charCode) == 'G') {
                matchedCharacter = 'ل';
                typedCharacter = CheckCapsLock(key) ? 'G' : 'g';
            } else {
                return '';
            }
            break;
        case 102:
            if (String.fromCharCode(charCode) == 'F') {
                matchedCharacter = 'ب';
                typedCharacter = CheckCapsLock(key) ? 'F' : 'f';
            } else {
                return '';
            }
            break;
        case 39:
            if (String.fromCharCode(charCode) == 'Þ') {
                matchedCharacter = 'ط';
                typedCharacter = '\'';
            } else {
                return '';
            }
            break;
        case 113:
            matchedCharacter = 'ض';
            typedCharacter = CheckCapsLock(key) ? 'Q' : 'q';
            break;
        case 221:
            matchedCharacter = 'د';
            typedCharacter = ']';
            break;
        case 222:
            matchedCharacter = 'ط';
            typedCharacter = '\'';
            break;
        case 219:
            matchedCharacter = 'ج';
            typedCharacter = '[';
            break;
        case 186:
            matchedCharacter = 'ك';
            typedCharacter = ';';
            break;
        case 191:
            matchedCharacter = 'ظ';
            typedCharacter = '/';
            break;
        case 190:
            matchedCharacter = 'ز';
            typedCharacter = '.';
            break;
        case 188:
            matchedCharacter = 'و';
            typedCharacter = ',';
            break;
        case 192:
            matchedCharacter = 'ذ';
            typedCharacter = '`';
            break;
        case 119:
            matchedCharacter = 'ص';
            typedCharacter = CheckCapsLock(key) ? 'W' : 'w';
            break;
        case 114:
            matchedCharacter = 'ق';
            typedCharacter = CheckCapsLock(key) ? 'R' : 'r';
            break;
        case 116:
            matchedCharacter = 'ف';
            typedCharacter = CheckCapsLock(key) ? 'T' : 't';
            break;
        case 121:
            matchedCharacter = 'غ';
            typedCharacter = CheckCapsLock(key) ? 'Y' : 'y';
            break;
        case 117:
            matchedCharacter = 'ع';
            typedCharacter = CheckCapsLock(key) ? 'U' : 'u';
            break;
        case 105:
            if (String.fromCharCode(charCode) == 'I') {
                matchedCharacter = 'ه';
                typedCharacter = CheckCapsLock(key) ? 'I' : 'i';
            } else {
                return '';
            }
            break;
        case 111:
            if (String.fromCharCode(charCode) == 'O') {
                matchedCharacter = 'خ';
                typedCharacter = CheckCapsLock(key) ? 'O' : 'o';
            } else {
                return '';
            }
            break;
        case 112:
            matchedCharacter = 'ح';
            typedCharacter = CheckCapsLock(key) ? 'P' : 'p';
            break;
        case 91:
            matchedCharacter = 'ج';
            typedCharacter = '[';
            break;
        case 93:
            matchedCharacter = 'د';
            typedCharacter = ']';
            break;
        case 115:
            matchedCharacter = 'س';
            typedCharacter = CheckCapsLock(key) ? 'S' : 's';
            break;
        case 106:
            if (String.fromCharCode(charCode) == 'J') {
                matchedCharacter = 'ت';
                typedCharacter = CheckCapsLock(key) ? 'J' : 'j';
            } else {
                return '';
            }
            break;
        case 107:
            if (String.fromCharCode(charCode) == 'K') {
                matchedCharacter = 'ن';
                typedCharacter = CheckCapsLock(key) ? 'K' : 'k';
            } else {
                return '';
            }
            break;
        case 108:
            matchedCharacter = 'م';
            typedCharacter = CheckCapsLock(key) ? 'L' : 'l';
            break;
        case 59:
            matchedCharacter = 'ك';
            typedCharacter = ';';
            break;
        case 122:
            matchedCharacter = 'ئ';
            typedCharacter = CheckCapsLock(key) ? 'Z' : 'z';
            break;
        case 120:
            matchedCharacter = 'ء';
            typedCharacter = CheckCapsLock(key) ? 'X' : 'x';
            break;
        case 118:
            matchedCharacter = 'ر';
            typedCharacter = CheckCapsLock(key) ? 'V' : 'v';
            break;
        case 110:
            if (String.fromCharCode(charCode) == 'N') {
                matchedCharacter = 'ى';
                typedCharacter = CheckCapsLock(key) ? 'N' : 'n';
            } else {
                return '';
            }
            break;
        case 109:
            if (String.fromCharCode(charCode) == 'M') {
                matchedCharacter = 'ة';
                typedCharacter = CheckCapsLock(key) ? 'M' : 'm';
            } else {
                return '';
            }
            break;
        case 44:
            matchedCharacter = 'و';
            typedCharacter = ',';
            break;
        case 47:
            matchedCharacter = 'ظ';
            typedCharacter = '/';
            break;
        case 81:
            matchedCharacter = 'ض';
            typedCharacter = CheckCapsLock(key) ? 'Q' : 'q';
            break;
        case 87:
            matchedCharacter = 'ص';
            typedCharacter = CheckCapsLock(key) ? 'W' : 'w';
            break;
        case 69:
            matchedCharacter = 'ث';
            typedCharacter = CheckCapsLock(key) ? 'E' : 'e';
            break;
        case 82:
            matchedCharacter = 'ق';
            typedCharacter = CheckCapsLock(key) ? 'R' : 'r';
            break;
        case 84:
            matchedCharacter = 'ف';
            typedCharacter = CheckCapsLock(key) ? 'T' : 't';
            break;
        case 89:
            matchedCharacter = 'غ';
            typedCharacter = CheckCapsLock(key) ? 'Y' : 'y';
            break;
        case 85:
            matchedCharacter = 'ع';
            typedCharacter = CheckCapsLock(key) ? 'U' : 'u';
            break;
        case 73:
            matchedCharacter = 'ه';
            typedCharacter = CheckCapsLock(key) ? 'I' : 'i';
            break;
        case 79:
            matchedCharacter = 'خ';
            typedCharacter = CheckCapsLock(key) ? 'O' : 'o';
            break;
        case 80:
            matchedCharacter = 'ح';
            typedCharacter = CheckCapsLock(key) ? 'P' : 'p';
            break;
        case 65:
            matchedCharacter = 'ش';
            typedCharacter = CheckCapsLock(key) ? 'A' : 'a';
            break;
        case 83:
            matchedCharacter = 'س';
            typedCharacter = CheckCapsLock(key) ? 'S' : 's';
            break;
        case 68:
            matchedCharacter = 'ي';
            typedCharacter = CheckCapsLock(key) ? 'D' : 'd';
            break;
        case 70:
            matchedCharacter = 'ب';
            typedCharacter = CheckCapsLock(key) ? 'F' : 'f';
            break;
        case 71:
            matchedCharacter = 'ل';
            typedCharacter = CheckCapsLock(key) ? 'G' : 'g';
            break;
        case 72:
            matchedCharacter = 'ا';
            typedCharacter = CheckCapsLock(key) ? 'H' : 'h';
            break;
        case 74:
            matchedCharacter = 'ت';
            typedCharacter = CheckCapsLock(key) ? 'J' : 'j';
            break;
        case 75:
            matchedCharacter = 'ن';
            typedCharacter = CheckCapsLock(key) ? 'K' : 'k';
            break;
        case 76:
            matchedCharacter = 'م';
            typedCharacter = CheckCapsLock(key) ? 'L' : 'l';
            break;
        case 90:
            matchedCharacter = 'ئ';
            typedCharacter = CheckCapsLock(key) ? 'Z' : 'z';
            break;
        case 88:
            matchedCharacter = 'ء';
            typedCharacter = CheckCapsLock(key) ? 'X' : 'x';
            break;
        case 67:
            matchedCharacter = 'ؤ';
            typedCharacter = CheckCapsLock(key) ? 'C' : 'c';
            break;
        case 86:
            matchedCharacter = 'ر';
            typedCharacter = CheckCapsLock(key) ? 'V' : 'v';
            break;
        case 66:
            matchedCharacter = 'لا';
            typedCharacter = CheckCapsLock(key) ? 'B' : 'b';
            break;
        case 78:
            matchedCharacter = 'ى';
            typedCharacter = CheckCapsLock(key) ? 'N' : 'n';
            break;
        case 77:
            matchedCharacter = 'ة';
            typedCharacter = CheckCapsLock(key) ? 'M' : 'm';
            break;
        case 96:
            if (String.fromCharCode(charCode) != '`') {
                matchedCharacter = 'ذ';
                typedCharacter = '`';
            }
            return '';
            break;
        case 46:
            matchedCharacter = 'ز';
            typedCharacter = '.';
            break;
        case 32:
            matchedCharacter = ' ';
            typedCharacter = ' ';
            break;
    }
    return isArabic ? matchedCharacter : typedCharacter;

}

// check if user enter capslock or shift key
export function CheckCapsLock(key: KeyboardEvent) {
    if (key.getModifierState('CapsLock')) {
        return true;
    } else if (key.shiftKey) {
        return true;
    }
    return false;
}
