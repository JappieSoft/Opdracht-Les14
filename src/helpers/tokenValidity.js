function tokenValid(data) {
    const timeStamp = data.exp;
    const currentTime = Date.now();

    return (timeStamp < currentTime);
}

export default tokenValid;


