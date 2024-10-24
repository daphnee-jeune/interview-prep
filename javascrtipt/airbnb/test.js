class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];
    this.catchers = [];

    const resolve = this.resolve.bind(this);
    const reject = this.reject.bind(this);

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  resolve(value) {
    if (this.state === "pending") return;
    this.state = "fulfilled";
    this.value = value;
    this.handlers.forEach((handler) => handler(value));
  }
  reject(error) {
    if (this.state === "pending") return;
    this.state = "rejected";
    this.value = error;
    this.catchers.forEach((catcher) => catcher(error));
  }
  then(onSuccess) {
    return new MyPromise((resolve, reject) => {
      const handle = () => {
        if (this.state === "fulfilled") {
          const result = onSuccess(this.value);
          resolve(result);
        }
      };
      if (this.state === "pending") {
        this.handlers.push(handle);
      } else if (this.state === "fulfilled") {
        handle();
      }
    });
  }
  catch(onError) {
    return new MyPromise((resolve, reject) => {
      const handle = () => {
        if (this.state === "rejected") {
          const result = onError(this.value);
          reject(result);
        }
      };
      if (this.state === "pending") {
        this.catchers.forEach((catcher) => catcher(handle));
      } else if (this.state === "rejected") {
        handle();
      }
    });
  }
  finally(onFinally) {
    return new MyPromise((resolve, reject) => {
      const handle = () => {
        onFinally();
        if (this.state === "fulfilled") {
          resolve(this.value);
        } else if (this.state === "rejected") {
          reject(this.value);
        }
      };
      if (this.state === "pending") {
        this.handlers.push(handle);
        this.catchers.push(handle);
      } else {
        handle();
      }
    });
  }
}
