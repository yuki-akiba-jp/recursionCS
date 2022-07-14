def billSummation(arr1, arr2):
    re = 0
    for i in range(len(arr1)):
        re += arr1[i]*arr2[i]
    return re
