var DuplicateRemover = {

    removeDuplicate: function (sourceArray) {
        var count = (sourceArray.length - 1);
        var newArr = [];

        newArr = DuplicateRemover.removeNow(sourceArray, newArr, count);

        return newArr;
    },


    removeNow: function (_arr, _newArr, count) {
        while (count >= 0) {
            var p = _arr[_arr.length - 1];
            _arr.splice(_arr.length - 1, 1);

            for (var i = _arr.length - 1; i >= 0; i--) {
                if (p.x == _arr[i].x && p.y == _arr[i].y) {
                    //trace("duplicate! " + _arr[i]);
                    _arr.splice(i, 1);
                }
            }

            _newArr.push(p);
            count--;
        }

        var a = [];

        for (var j = 0; j < _newArr.length; j++) {
            if (_newArr[j]) {
                a.push(_newArr[j]);
            }
        }

        return a;

    }

}