<p align="center">
  Тестове завдання comments
</p>

<a href="https://comments-test-8ebr.onrender.com" target="_blank">
 API url
</a>

<a href="https://comments-test-8ebr.onrender.com/api" target="_blank">
 Swagger url
</a>

<a href="https://github.com/YaroslavOnofriichuk/comments/blob/main/db_schema.sql" target="_blank">
 Схема бази данних
</a>

<p>
Для того щоб додавати, редагувати і видаляти коментарі потрібно 
<a href="https://comments-test-8ebr.onrender.com/api#/Auth/AuthController_register" target="_blank">зареєструватися</a>,
а потім <a href="https://comments-test-8ebr.onrender.com/api#/Auth/AuthController_login" target="_blank">авторизуватися</a>
отримаємо accessToken і refreshToken, accessToken прикріпляємо до хедерів авторизації, а refreshToken потрібен для того щоб <a href="https://comments-test-8ebr.onrender.com/api#/Auth/AuthController_refresh" target="_blank">оновити</a> accessToken
</p>

<p>
Тепер можемо <a href="https://comments-test-8ebr.onrender.com/api#/Comments/CommentsController_create" target="_blank">створити</a> перший коментар, 
<a href="https://comments-test-8ebr.onrender.com/api#/Comments/CommentsController_update" target="_blank">оновити його</a>,
<a href="https://comments-test-8ebr.onrender.com/api#/Comments/CommentsController_remove" target="_blank">видалити</a>,
і <a href="https://comments-test-8ebr.onrender.com/api#/Comments/CommentsController_findAll" target="_blank">переглянути всі</a> коментарі
</p>

<p>
До кометаря можна <a href="https://comments-test-8ebr.onrender.com/api#/Auth/AuthController_register" target="_blank">прикріпити файл</a>,
Або <a href="https://comments-test-8ebr.onrender.com/api#/Comment%20files/CommentFilesController_remove" target="_blank">видалити його</a>
</p>

<p>
У розробці використовувалися такі технології: nestjs, typeorm і postgresql, 
jwt, cache-manager, bcrypt, jimp і multer
</p>
