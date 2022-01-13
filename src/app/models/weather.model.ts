export class Weather {
  constructor(
    public name: string = '',
    public date: string = '',
    public desc: string = '',
    public temp: number = null,
    public more: string = '',
    public imgUrl: string = '',
    public key: number = null,
    public _id?: string
  ) {}

  setId?() {
    // Implement your own set Id
    this._id = makeId();
    // this._id = '12345';
  }
}

function makeId(length = 5) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
