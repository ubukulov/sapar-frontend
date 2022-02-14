export const checkPlaceForUpperOrLow = function(place) {
    if(place > 32) {
        return 0;
    }
    if(place < 17) {
        return place;
    }
    if (place > 16 && place < 32) {
        let uItems = [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
        for(let i = 0; i < uItems.length; i++) {
            if (uItems[i] === place) {
                return uItems[i] - 16;
            }
        }
    }
}
export const checkPlaceForUpperOrLower = function(place, carTypeId) {
    if (carTypeId === 2) {
        let upperPlaces = [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34];
        let lowerPlaces = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,35,36];
        for(let i = 0; i<upperPlaces.length; i++) {
            if (upperPlaces[i] === place) {
                return '(верхний)';
            }
        }
        for(let i = 0; i<lowerPlaces.length; i++) {
            if (lowerPlaces[i] === place) {
                return '(нижний)';
            }
        }
    } else {
        return '';
    }
}