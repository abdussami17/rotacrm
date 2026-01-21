
// Simplified Data - Only 2 conversations with 1-2 messages each
const users = [
    { id: 1, name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=1', status: 'Active now', online: true, role: 'Project Manager' },
    { id: 2, name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?img=5', status: 'Active 2h ago', online: true, role: 'UI Designer' }
];

let conversations = [
    { 
        id: 1, 
        userId: 1, 
        lastMessage: "Hi, let's discuss the project", 
        time: '10:30 AM', 
        unread: 1, 
        pinned: false,
        isGroup: false
    },
    { 
        id: 2, 
        userId: 2, 
        lastMessage: 'I have some design updates', 
        time: 'Yesterday', 
        unread: 0, 
        pinned: false,
        isGroup: false
    }
];

let messages = {
    1: [
        { id: 1, text: "Hi Alex, let's discuss the project timeline.", sent: false, time: '10:15 AM' }
    ],
    2: [
        { id: 1, text: "Hi, I have some design updates for the dashboard.", sent: false, time: '4:00 PM' },
        { id: 2, text: "Great! Can you share them with me?", sent: true, time: '4:05 PM' }
    ]
};

const mediaItems = [
    { id: 1, url: 'https://picsum.photos/400/300?random=1', type: 'image', time: '2 days ago' },
    { id: 2, url: 'https://picsum.photos/400/300?random=2', type: 'image', time: '1 week ago' }
];

// State
let currentConversationId = null;
let userSelect = null;
let groupMembersSelect = null;

// DOM Elements
const conversationsList = document.getElementById('conversationsList');
const emptyState = document.getElementById('emptyState');
const activeChat = document.getElementById('activeChat');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const conversationsSidebar = document.getElementById('conversationsSidebar');

// Initialize the application
function init() {
    renderConversations();
    setupEventListeners();
    initTomSelect();
}

// Render conversations list
function renderConversations() {
    if (conversations.length === 0) {
        conversationsList.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-comment-slash fa-2x text-muted mb-3"></i>
                <p class="text-muted">No conversations yet</p>
            </div>
        `;
        return;
    }

    conversationsList.innerHTML = conversations.map(conv => {
        const user = users.find(u => u.id === conv.userId);
        const activeClass = conv.id === currentConversationId ? 'active' : '';
        
        return `
            <div class="conversation-item ${activeClass}" data-conversation-id="${conv.id}">
                <img src="${user.avatar}" 
                     alt="${user.name}" 
                     class="conversation-avatar">
                <div class="conversation-info">
                    <div class="conversation-header">
                        <span class="conversation-name">${user.name}</span>
                        <span class="conversation-time">${conv.time}</span>
                    </div>
                    <div class="conversation-preview">${conv.lastMessage}</div>
                </div>
                <div class="conversation-meta">
                    <button class="pin-btn ${conv.pinned ? 'pinned' : ''}" data-conversation-id="${conv.id}">
                        <i class="fas fa-thumbtack"></i>
                    </button>
                    ${conv.unread > 0 ? `<span class="unread-badge">${conv.unread}</span>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Open conversation
function openConversation(conversationId) {
    currentConversationId = conversationId;
    
    const conversation = conversations.find(c => c.id === conversationId);
    const user = users.find(u => u.id === conversation.userId);
    
    // Mark as read
    conversation.unread = 0;
    
    // Update UI
    emptyState.style.display = 'none';
    activeChat.style.display = 'block';
    
    document.getElementById('chatUserName').textContent = user.name;
    document.getElementById('chatUserStatus').innerHTML = `
        <span class="status-indicator ${user.online ? 'status-online' : 'status-offline'}"></span>
        <span>${user.status}</span>
    `;
    
    document.querySelector('.chat-header .conversation-avatar').src = user.avatar;
    
    // Render messages
    renderMessages(conversationId);
    renderConversations();
    
    // Mobile view handling
    if (window.innerWidth <= 992) {
        conversationsSidebar.classList.remove('active');
    }
    
    // Focus input
    setTimeout(() => {
        messageInput.focus();
    }, 100);
}

// Render messages
function renderMessages(conversationId) {
    const messageList = messages[conversationId] || [];
    
    chatMessages.innerHTML = messageList.map(msg => {
        return `
            <div class="message ${msg.sent ? 'sent' : 'received'}">
                <div class="message-content">
                    <div>${msg.text}</div>
                    <div class="message-time">${msg.time}</div>
                </div>
                <div class="message-actions">
                    <button class="message-action-btn" onclick="copyMessage(${msg.id}, ${conversationId})" title="Copy">
                        <i class="far fa-copy"></i>
                    </button>
                    <button class="message-action-btn delete" onclick="deleteMessage(${msg.id}, ${conversationId})" title="Delete">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message
function sendMessage() {
    const text = messageInput.value.trim();
    
    if (!text || !currentConversationId) return;
    
    if (!messages[currentConversationId]) {
        messages[currentConversationId] = [];
    }
    
    const now = new Date();
    const newMessage = {
        id: Date.now(),
        text: text,
        sent: true,
        time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };
    
    messages[currentConversationId].push(newMessage);
    
    const conversation = conversations.find(c => c.id === currentConversationId);
    conversation.lastMessage = text;
    conversation.time = newMessage.time;
    
    messageInput.value = '';
    messageInput.style.height = 'auto';
    renderMessages(currentConversationId);
    renderConversations();
}

// Copy message to clipboard
function copyMessage(messageId, conversationId) {
    const messageList = messages[conversationId];
    const message = messageList.find(m => m.id === messageId);
    
    if (message) {
        navigator.clipboard.writeText(message.text)
            .then(() => {
                showToast('Message copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }
}

// Delete message
function deleteMessage(messageId, conversationId) {
    if (confirm('Are you sure you want to delete this message?')) {
        const messageList = messages[conversationId];
        const messageIndex = messageList.findIndex(m => m.id === messageId);
        
        if (messageIndex > -1) {
            messageList.splice(messageIndex, 1);
            renderMessages(conversationId);
            showToast('Message deleted');
        }
    }
}

// Toggle pin conversation
function togglePinConversation(conversationId) {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
        conversation.pinned = !conversation.pinned;
        renderConversations();
        showToast(conversation.pinned ? 'Conversation pinned' : 'Conversation unpinned');
    }
}

// Show members modal
function showMembersModal() {
    if (!currentConversationId) return;
    
    const conversation = conversations.find(c => c.id === currentConversationId);
    const membersList = document.getElementById('membersList');
    
    const user = users.find(u => u.id === conversation.userId);
    membersList.innerHTML = `
        <div class="d-flex align-items-center p-3">
            <img src="${user.avatar}" 
                 alt="${user.name}" 
                 class="rounded-circle me-3" 
                 width="50" 
                 height="50">
            <div>
                <h6 class="mb-1">${user.name}</h6>
                <small class="text-muted">${user.role}</small>
                <div class="mt-2">
                    <span class="badge ${user.online ? 'bg-success' : 'bg-secondary'}">
                        ${user.online ? 'Online' : 'Offline'}
                    </span>
                </div>
            </div>
        </div>
    `;
    
    new bootstrap.Modal(document.getElementById('membersModal')).show();
}

// Show media modal
function showMediaModal() {
    const grid = document.getElementById('mediaGrid');
    grid.innerHTML = mediaItems.map(item => `
        <div class="col-6 col-md-4 col-lg-3 mb-3">
            <div class="card border-0">
                <img src="${item.url}" 
                     alt="Media" 
                     class="card-img-top rounded"
                     style="height: 150px; object-fit: cover;">
                <div class="card-body p-2">
                    <small class="text-muted">${item.time}</small>
                </div>
            </div>
        </div>
    `).join('');
    
    new bootstrap.Modal(document.getElementById('mediaModal')).show();
}

// Initialize TomSelect dropdowns
function initTomSelect() {
    // User select for starting chat
    const userSelectEl = document.getElementById('userSelect');
    userSelectEl.innerHTML = users.map(user => 
        `<option value="${user.id}">${user.name} - ${user.role}</option>`
    ).join('');
    
    userSelect = new TomSelect('#userSelect', {
        placeholder: 'Select a user to chat with',
        maxItems: 1,
        create: false
    });

    // Group members select
    const groupMembersEl = document.getElementById('groupMembers');
    groupMembersEl.innerHTML = users.map(user => 
        `<option value="${user.id}">${user.name} - ${user.role}</option>`
    ).join('');
    
    groupMembersSelect = new TomSelect('#groupMembers', {
        placeholder: 'Select group members',
        maxItems: null,
        create: false,
        plugins: ['remove_button']
    });
}

// Start new chat
function startNewChat() {
    new bootstrap.Modal(document.getElementById('startChatModal')).show();
}

// Create new group
function createNewGroup() {
    new bootstrap.Modal(document.getElementById('newGroupModal')).show();
}

// Confirm start chat
function confirmStartChat() {
    const selectedUserId = userSelect.getValue();
    const initialMessage = document.getElementById('initialMessage').value.trim();
    
    if (!selectedUserId) {
        alert('Please select a user');
        return;
    }
    
    const user = users.find(u => u.id == selectedUserId);
    const newConversation = {
        id: Date.now(),
        userId: parseInt(selectedUserId),
        lastMessage: initialMessage || 'New conversation started',
        time: 'Just now',
        unread: 0,
        pinned: false,
        isGroup: false
    };
    
    conversations.unshift(newConversation);
    messages[newConversation.id] = [];
    
    if (initialMessage) {
        messages[newConversation.id].push({
            id: Date.now(),
            text: initialMessage,
            sent: true,
            time: 'Just now'
        });
    }
    
    openConversation(newConversation.id);
    renderConversations();
    
    // Reset form
    userSelect.clear();
    document.getElementById('initialMessage').value = '';
    
    bootstrap.Modal.getInstance(document.getElementById('startChatModal')).hide();
    showToast('Chat started with ' + user.name);
}

// Confirm create group
function confirmCreateGroup() {
    const groupName = document.getElementById('groupName').value.trim();
    const selectedMembers = groupMembersSelect.getValue();
    
    if (!groupName) {
        alert('Please enter a group name');
        return;
    }
    
    if (selectedMembers.length < 2) {
        alert('Please select at least 2 members for the group');
        return;
    }
    
    const newGroup = {
        id: Date.now(),
        name: groupName,
        avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(groupName) + '&background=007bff&color=fff',
        lastMessage: 'Group created',
        time: 'Just now',
        unread: 0,
        pinned: false,
        isGroup: true,
        members: selectedMembers.map(id => parseInt(id))
    };
    
    conversations.unshift(newGroup);
    messages[newGroup.id] = [
        {
            id: Date.now(),
            text: `Group "${groupName}" was created`,
            sent: false,
            time: 'Just now'
        }
    ];
    
    openConversation(newGroup.id);
    renderConversations();
    
    // Reset form
    document.getElementById('groupName').value = '';
    groupMembersSelect.clear();
    
    bootstrap.Modal.getInstance(document.getElementById('newGroupModal')).hide();
    showToast('Group "' + groupName + '" created');
}

// Handle search
function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    
    if (!query) {
        renderConversations();
        return;
    }
    
    const filtered = conversations.filter(conv => {
        const user = users.find(u => u.id === conv.userId);
        return user.name.toLowerCase().includes(query) || 
               conv.lastMessage.toLowerCase().includes(query);
    });
    
    if (filtered.length === 0) {
        conversationsList.innerHTML = '<div class="text-center py-5 text-muted">No conversations found</div>';
        return;
    }
    
    conversationsList.innerHTML = filtered.map(conv => {
        const user = users.find(u => u.id === conv.userId);
        const activeClass = conv.id === currentConversationId ? 'active' : '';
        
        return `
            <div class="conversation-item ${activeClass}" data-conversation-id="${conv.id}">
                <img src="${user.avatar}" 
                     alt="${user.name}" 
                     class="conversation-avatar">
                <div class="conversation-info">
                    <div class="conversation-header">
                        <span class="conversation-name">${user.name}</span>
                        <span class="conversation-time">${conv.time}</span>
                    </div>
                    <div class="conversation-preview">${conv.lastMessage}</div>
                </div>
            </div>
        `;
    }).join('');
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.style.zIndex = '1050';
    
    toast.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Conversation click events
    conversationsList.addEventListener('click', (event) => {
        const conversationItem = event.target.closest('.conversation-item');
        if (conversationItem) {
            const conversationId = parseInt(conversationItem.dataset.conversationId);
            openConversation(conversationId);
        }
        
        // Pin button click
        const pinBtn = event.target.closest('.pin-btn');
        if (pinBtn) {
            const conversationId = parseInt(pinBtn.dataset.conversationId);
            togglePinConversation(conversationId);
            event.stopPropagation();
        }
    });

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Message input events
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Button events
    document.getElementById('mobileBackBtn').addEventListener('click', () => {
        conversationsSidebar.classList.add('active');
    });
    
    document.getElementById('membersHeaderBtn').addEventListener('click', showMembersModal);
    document.getElementById('viewMediaHeaderBtn').addEventListener('click', showMediaModal);
    document.getElementById('attachBtn').addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,video/*,.pdf,.doc,.docx';
        input.onchange = () => {
            if (input.files.length > 0) {
                showToast(`File "${input.files[0].name}" attached`);
            }
        };
        input.click();
    });
    
    document.getElementById('sendBtn').addEventListener('click', sendMessage);
    document.getElementById('startChatBtn').addEventListener('click', startNewChat);
    document.getElementById('startChatBtn2').addEventListener('click', startNewChat);
    document.getElementById('newGroupBtn').addEventListener('click', createNewGroup);
    document.getElementById('startChatConfirm').addEventListener('click', confirmStartChat);
    document.getElementById('createGroupBtn').addEventListener('click', confirmCreateGroup);

    // Click outside on mobile to close sidebar
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 992 && 
            !conversationsSidebar.contains(event.target) && 
            !event.target.closest('.mobile-back-btn') &&
            conversationsSidebar.classList.contains('active')) {
            conversationsSidebar.classList.remove('active');
        }
    });
    
    // Window resize handling
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            conversationsSidebar.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
