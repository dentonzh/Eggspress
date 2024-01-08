
Image files should ideally be kept in the same folder as the `.md` files that reference them or in a subfolder below the `.md` file. 

For example, if your post is stored as `my_posts/initial-posts/first-post.md` and uses `a-picture.jpeg`, you can keep `a-picture.jpeg` in these directories:
- `my_posts/initial-posts/a-picture.jpeg`
- `my_posts/initial-posts/images/a-picture.jpeg`
- `my_posts/initial-posts/images/a/lot/of/nested/folders/a-picture.jpeg`

But we recommend against keeping it as `my_posts/a-picture.jpeg`. Eggspress will find `a-picture.jpeg`, but if there is another file named `a-picture.jpeg` that is located in any of the directories above,
This is strongly recommended if you intend on adding many images with the possibility of more than one image having the same filename.

For more details about file organization, editor settings, and images, see the [full documentation](https://eggspress.vercel.app). 