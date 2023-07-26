class PaginationHelper {
  constructor(collection, itemsPerPage) {
    // The constructor takes in an array of items and a integer indicating how many
    // items fit within a single page
    this.collection = collection;
    this.itemsPerPage = itemsPerPage;
  }
  itemCount() {
    // returns the number of items within the entire collection
    return this.collection.length;
  }
  pageCount() {
    // returns the number of pages
    if (this.itemCount === 0) return -1;
    if (this.itemsPerPage < 0) return -1;
    return Math.ceil(this.collection.length / this.itemsPerPage);
  }
  pageItemCount(pageIndex) {
    // returns the number of items on the current page. page_index is zero based.
    // this method should return -1 for pageIndex values that are out of range
    if (pageIndex > this.pageCount() - 1) return -1;
    if (pageIndex < 0) return -1;
    if (pageIndex === this.pageCount() - 1)
      return this.collection.length % this.itemsPerPage;
    return this.itemsPerPage;
  }
  pageIndex(itemIndex) {
    // determines what page an item is on. Zero based indexes
    // this method should return -1 for itemIndex values that are out of range
    if (itemIndex < 0) return -1;
    if (itemIndex > this.collection.length - 1) return -1;
    if (itemIndex < this.itemsPerPage) return 0;

    let count = 0;
    for (
      let i = this.itemsPerPage;
      i <= this.collection.length;
      i += this.itemsPerPage
    ) {
      if (i % this.itemsPerPage === 0) {
        if (itemIndex >= i) {
          count++;
        }
      }
    }
    return count;
  }
}

const helper = new PaginationHelper(
  [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ],
  10
);

console.log(helper.itemCount());
console.log(helper.pageCount());
console.log(helper.pageItemCount(0));
console.log(helper.pageItemCount(1));
// console.log(helper.pageItemCount(2));
// console.log(helper.pageItemCount(3));
// console.log(helper.pageIndex(2));
// console.log(helper.pageIndex(5));
// console.log(helper.pageIndex(15));
// console.log(helper.pageIndex(-20));
// console.log(helper.pageIndex(24));
// console.log(helper.pageIndex(-20));
