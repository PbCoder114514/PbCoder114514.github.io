let currentArticleId = '';

// 添加新博客文章的函数
function addPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const password = document.getElementById('password').value;

    // 检查输入是否为空
    if (title === '' || content === '' || password === '') {
        alert('标题、内容和密码不能为空。');
        return;
    }
    // 验证密码
    if (password !== 'pbcoder&yushyi314') {
        alert('密码错误');
        return;
    }

    // 创建新的文章元素
    const postsContainer = document.getElementById('postsContainer');
    const pinnedPostsContainer = document.getElementById('pinnedPostsContainer'); // 获取置顶区域
    
    const newArticle = document.createElement('article');
    const articleId = 'article-' + Date.now(); // 为每个文章生成唯一 ID

    newArticle.innerHTML = `
        <h2 id="${articleId}">${title}</h2>
        <div class="文章">${content}</div>
        <button onclick="openEditModal('${articleId}')">修改</button>
        <button onclick="openDeleteModal('${articleId}')">删除</button>
        <button onclick="openPinModal('${articleId}')">置顶</button>
    `;

    postsContainer.appendChild(newArticle); // 添加到正常区域

    // 动态添加到左侧栏
    updateBlogLinks(articleId, title);

    // 清空输入框
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    document.getElementById('password').value = '';
}

// 更新左侧栏链接
function updateBlogLinks(articleId, title) {
    const myBlogLinks = document.getElementById('myBlogLinks');
    const link = document.createElement('div');
    link.innerHTML = `<a href="#${articleId}">${title}</a>`;
    myBlogLinks.appendChild(link);
}

// 打开删除模态窗口
function openDeleteModal(articleId) {
    currentArticleId = articleId;
    document.getElementById('deleteModal').style.display = "block";
}

// 打开编辑模态窗口
function openEditModal(articleId) {
    currentArticleId = articleId;
    document.getElementById('editModalContent').value = document.getElementById(currentArticleId).nextElementSibling.textContent;
    document.getElementById('editModal').style.display = "block";
}

// 打开置顶模态窗口
function openPinModal(articleId) {
    currentArticleId = articleId;
    document.getElementById('pinModal').style.display = "block";
}

// 关闭模态窗口的通用函数
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    if (modalId === 'editModal') {
        document.getElementById('editModalPassword').value = ''; // 清空密码输入框
        document.getElementById('editModalContent').value = ''; // 清空内容输入框
    } else if (modalId === 'deleteModal') {
        document.getElementById('deleteModalPassword').value = ''; // 清空密码输入框
    } else if (modalId === 'pinModal') {
        document.getElementById('pinModalPassword').value = ''; // 清空密码输入框
    }
}

// 确认删除文章
document.getElementById('deleteModalConfirmButton').onclick = function() {
    const password = document.getElementById('deleteModalPassword').value;

    if (password !== 'pbcoder&yushyi314') {
        alert('密码错误');
        return;
    }
    const article = document.getElementById(currentArticleId).closest('article');
    if (article) {
        article.remove(); // 删除文章
        // 在左侧栏中也移除相应的链接
        updateBlogLinksOnDelete(currentArticleId);
    }
    closeModal('deleteModal'); // 关闭模态窗口
}

// 更新左侧栏链接以删除
function updateBlogLinksOnDelete(articleId) {
    const myBlogLinks = document.getElementById('myBlogLinks');
    const links = myBlogLinks.getElementsByTagName('a');
    for (let link of links) {
        if (link.getAttribute('href') === `#${articleId}`) {
            myBlogLinks.removeChild(link.parentElement); // 移除相应链接
            break;
        }
    }
}

// 确认编辑文章
document.getElementById('editModalConfirmButton').onclick = function() {
    const password = document.getElementById('editModalPassword').value;

    if (password !== 'pbcoder&yushyi314') {
        alert('密码错误');
        return;
    }
    const newContent = document.getElementById('editModalContent').value;
    document.getElementById(currentArticleId).nextElementSibling.innerHTML = newContent; // 更新内容
    closeModal('editModal'); // 关闭模态窗口
}

// 确认置顶或取消置顶文章
document.getElementById('pinModalConfirmButton').onclick = function() {
    const password = document.getElementById('pinModalPassword').value;

    if (password !== 'pbcoder&yushyi314') {
        alert('密码错误');
        return;
    }
    const article = document.getElementById(currentArticleId).closest('article');
    const postsContainer = document.getElementById('postsContainer');

    // 切换置顶状态
    if (article.parentElement.id === 'pinnedPostsContainer') {
        // 如果文章当前已经在置顶区域，取消置顶
        postsContainer.appendChild(article); // 取消置顶，放到最后
    } else {
        // 如果文章不在置顶区域，执行置顶
        document.getElementById('pinnedPostsContainer').appendChild(article); // 置顶
    }
    closeModal('pinModal'); // 关闭模态窗口
}
