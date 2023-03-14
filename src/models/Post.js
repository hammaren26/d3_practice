export default class Post {
   constructor(title, img) {
      this.img = img
      this.title = title
      this.date = new Date()
   }

   toString() {
      return JSON.stringify({
         title: this.title,
         img: this.img,
         date: this.date.toJSON()
      }, null, 2)
   }


   getTest() {
      console.log('hello');
      return 'hello'
   }

}