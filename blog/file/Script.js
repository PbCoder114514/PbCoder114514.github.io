let currentEditId = ''; // 当前编辑的文章ID
    let currentDeleteId = ''; // 当前删除的文章ID
    let mima = 'yushyi314';
    // 弹出模态框
    function openModal() {
        document.getElementById('passwordModal').style.display = 'block';
    }

    // 关闭模态框
    function closeModal() {
        document.getElementById('passwordModal').style.display = 'none';
    }

    // 提交表单并验证密码
    function submitForm() {
        const password = document.getElementById('modalPassword').value;
        if (password !== mima) {
            alert('密码错误！');
            return;
        }

        // 如果密码正确，保存文章
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;

        if (title && content) {
            savePostToLocalStorage(title, content); // 保存文章
            loadPostsFromLocalStorage(); // 更新显示
            showFeedback('文章已成功发布！'); // 提示成功
            document.getElementById('postTitle').value = ''; // 清空输入框
            document.getElementById('postContent').value = ''; // 清空输入框
        } else {
            showFeedback('标题与内容不能为空！', true); // 提示错误
        }
        closeModal(); // 关闭模态框
    }

    // 将文章保存到 Local Storage
    function savePostToLocalStorage(title, content) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        // 检查标题是否重复
        if (posts.some(post => post.title === title)) {
            showFeedback('文章标题已存在，请使用不同的标题。', true);
            return;
        }
        posts.push({ title, content, pinned: false }); // 增加一个是否置顶的属性
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // 加载文章并显示在页面上
    function loadPostsFromLocalStorage() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = ''; // 清空当前内容

        // 排序：已置顶的文章在前
        const sortedPosts = posts.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

        sortedPosts.forEach((post, index) => {
            const postElement = document.createElement('article');
            postElement.innerHTML = `
                <h2 onclick="openContentModal('${post.content}')">${post.title}</h2>
                <button onclick="openEditModal(${index})">修改</button>
                <button onclick="openDeleteModal(${index})">删除</button>
                <button onclick="openPinModal(${index})">${post.pinned ? '取消置顶' : '置顶'}</button>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // 打开内容模态框
    function openContentModal(content) {
        document.getElementById('modalArticleContent').textContent = content;
        document.getElementById('contentModal').style.display = 'block';
    }

    // 关闭内容模态框
    function closeContentModal() {
        document.getElementById('contentModal').style.display = 'none';
    }

    // 显示反馈消息
    function showFeedback(message, isError = false) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = isError ? 'error' : 'message'; // 根据情况设置类名
        setTimeout(() => {
            feedback.textContent = ''; // 3秒后清空反馈
        }, 3000);
    }

    // 打开编辑模态框
    function openEditModal(index) {
        currentEditId = index;
        closeModal(); // 先关闭密码模态框
        document.getElementById('editModal').style.display = 'block';
    }

    // 关闭编辑模态框
    function closeEditModal() {
        document.getElementById('editModal').style.display = 'none';
    }

    // 确认编辑文章
    function confirmEdit() {
        const password = document.getElementById('editModalPassword').value;
        if (password !== mima) {
            alert('密码错误！');
            return;
        }

        const newContent = document.getElementById('editModalContent').value;
        if (newContent) {
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts[currentEditId].content = newContent; // 更新内容
            localStorage.setItem('posts', JSON.stringify(posts));
            loadPostsFromLocalStorage(); // 更新显示
            closeEditModal(); // 关闭编辑模态框
            showFeedback('文章已成功修改！'); // 提示成功
        } else {
            showFeedback('内容不能为空！', true); // 提示错误
        }
    }

    // 打开删除模态框
    function openDeleteModal(index) {
        currentDeleteId = index;
        document.getElementById('deleteModal').style.display = 'block';
    }

    // 关闭删除模态框
    function closeDeleteModal() {
        document.getElementById('deleteModal').style.display = 'none';
    }

    // 确认删除文章
    function confirmDelete() {
        const password = document.getElementById('deleteModalPassword').value;
        if (password !== mima) {
            alert('密码错误！');
            return;
        }

        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.splice(currentDeleteId, 1); // 删除文章
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPostsFromLocalStorage(); // 更新显示
        closeDeleteModal(); // 关闭删除模态框
        showFeedback('文章已成功删除！'); // 提示成功
    }

    // 打开置顶模态框
    function openPinModal(index) {
        currentPinId = index;
        document.getElementById('pinModal').style.display = 'block';
    }

    // 确认置顶
    function confirmPin() {
        const password = document.getElementById('pinModalPassword').value;
        if (password !== mima) {
            alert('密码错误！');
            return;
        }

        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts[currentPinId].pinned = !posts[currentPinId].pinned; // 切换置顶状态
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPostsFromLocalStorage(); // 更新显示
        closePinModal(); // 关闭模态框
    }

    // 页面加载时读取已保存的文章
    window.onload = function() {
        loadPostsFromLocalStorage();
    };
