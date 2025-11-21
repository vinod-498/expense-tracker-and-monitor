// Enhanced Business Expense Monitoring Application
class ExpenseTrackerPro {
    constructor() {
        this.currentUser = null;
        this.expenses = [];
        this.budgets = [];
        this.categories = [];
        this.currencies = [];
        this.paymentMethods = [];
        this.departments = [];
        this.users = [];
        this.demoAccounts = [];
        this.receipts = [];
        this.recurringExpenses = [];
        this.notifications = [];
        this.currentTab = 'dashboard';
        this.charts = {};
        
        this.init();
    }

    async init() {
        this.loadInitialData();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.showLogin();
    }

    loadInitialData() {
        // Load data from the provided JSON
        const data = {
            "expenses": [
                {"id": 1, "date": "2024-12-15", "amount": 1250.00, "category": "Travel", "description": "Flight tickets to client meeting", "paymentMethod": "Corporate Card", "department": "Sales", "projectCode": "PRJ-001", "status": "Approved", "submittedBy": "John Smith", "receipt": null, "currency": "USD"},
                {"id": 2, "date": "2024-12-14", "amount": 89.50, "category": "Meals", "description": "Team lunch meeting", "paymentMethod": "Corporate Card", "department": "Marketing", "projectCode": "PRJ-002", "status": "Pending", "submittedBy": "Sarah Johnson", "receipt": null, "currency": "USD"},
                {"id": 3, "date": "2024-12-13", "amount": 450.00, "category": "Office Supplies", "description": "Ergonomic office chairs", "paymentMethod": "Bank Transfer", "department": "HR", "projectCode": "PRJ-003", "status": "Approved", "submittedBy": "Mike Chen", "receipt": null, "currency": "USD"},
                {"id": 4, "date": "2024-12-12", "amount": 2100.00, "category": "IT Equipment", "description": "New laptops for development team", "paymentMethod": "Corporate Card", "department": "IT", "projectCode": "PRJ-004", "status": "Approved", "submittedBy": "Lisa Wang", "receipt": null, "currency": "USD"},
                {"id": 5, "date": "2024-12-11", "amount": 350.00, "category": "Marketing", "description": "Social media advertising", "paymentMethod": "Corporate Card", "department": "Marketing", "projectCode": "PRJ-005", "status": "Approved", "submittedBy": "David Lee", "receipt": null, "currency": "USD"}
            ],
            "budgets": [
                {"category": "Travel", "monthlyBudget": 5000, "spent": 2750, "remaining": 2250},
                {"category": "Meals", "monthlyBudget": 1000, "spent": 154.50, "remaining": 845.50},
                {"category": "Office Supplies", "monthlyBudget": 2000, "spent": 740, "remaining": 1260},
                {"category": "IT Equipment", "monthlyBudget": 8000, "spent": 2100, "remaining": 5900},
                {"category": "Marketing", "monthlyBudget": 3000, "spent": 350, "remaining": 2650}
            ],
            "users": [
                {"id": 1, "name": "John Smith", "role": "Manager", "department": "Sales", "email": "john.smith@company.com", "spendingLimit": 5000},
                {"id": 2, "name": "Sarah Johnson", "role": "Employee", "department": "Marketing", "email": "sarah.johnson@company.com", "spendingLimit": 1500},
                {"id": 3, "name": "Mike Chen", "role": "Admin", "department": "HR", "email": "mike.chen@company.com", "spendingLimit": 10000}
            ],
            "demoAccounts": [
                {"email": "john.smith@company.com", "password": "password123", "name": "John Smith", "role": "Manager", "department": "Sales"},
                {"email": "sarah.johnson@company.com", "password": "password123", "name": "Sarah Johnson", "role": "Employee", "department": "Marketing"},
                {"email": "admin@company.com", "password": "admin123", "name": "Admin User", "role": "Admin", "department": "IT"}
            ],
            "categories": ["Travel", "Meals", "Office Supplies", "IT Equipment", "Marketing", "Training", "Utilities", "Insurance", "Legal", "Consulting"],
            "paymentMethods": ["Corporate Card", "Bank Transfer", "Cash", "Personal Reimbursement", "Check"],
            "departments": ["Sales", "Marketing", "HR", "IT", "Finance", "Operations", "Legal", "R&D"],
            "currencies": [
                {"code": "USD", "symbol": "$", "name": "US Dollar"},
                {"code": "EUR", "symbol": "€", "name": "Euro"},
                {"code": "GBP", "symbol": "£", "name": "British Pound"},
                {"code": "JPY", "symbol": "¥", "name": "Japanese Yen"}
            ]
        };

        this.expenses = data.expenses;
        this.budgets = data.budgets;
        this.users = data.users;
        this.demoAccounts = data.demoAccounts;
        this.categories = data.categories;
        this.paymentMethods = data.paymentMethods;
        this.departments = data.departments;
        this.currencies = data.currencies;

        // Add some sample recurring expenses
        this.recurringExpenses = [
            {"id": 1, "amount": 500, "category": "Utilities", "description": "Monthly office rent", "frequency": "monthly", "nextDate": "2025-01-01", "active": true}
        ];

        // Initialize theme
        this.setupTheme();
    }

    setupEventListeners() {
        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        
        // Demo account buttons
        document.querySelectorAll('[data-email]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('email').value = e.target.dataset.email;
                document.getElementById('password').value = e.target.dataset.password;
            });
        });

        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Header actions
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());
        document.getElementById('notifications-btn').addEventListener('click', () => this.showNotifications());

        // Dashboard actions
        document.getElementById('add-expense-btn').addEventListener('click', () => this.showExpenseModal());
        document.getElementById('export-data-btn').addEventListener('click', () => this.exportData());

        // Expense form
        document.getElementById('expense-form').addEventListener('submit', (e) => this.handleExpenseSubmit(e));
        document.getElementById('expense-recurring').addEventListener('change', (e) => this.toggleRecurringOptions(e.target.checked));
        document.getElementById('split-expense').addEventListener('change', (e) => this.toggleSplitOptions(e.target.checked));

        // Receipt upload
        document.getElementById('receipt-upload-zone').addEventListener('click', () => {
            document.getElementById('receipt-file-input').click();
        });
        document.getElementById('receipt-file-input').addEventListener('change', (e) => this.handleReceiptUpload(e));
        document.getElementById('modal-upload-area').addEventListener('click', () => {
            document.getElementById('modal-receipt-input').click();
        });
        document.getElementById('modal-receipt-input').addEventListener('change', (e) => this.handleModalReceiptUpload(e));

        // Filters
        document.getElementById('search-expenses').addEventListener('input', (e) => this.filterExpenses());
        document.getElementById('filter-category').addEventListener('change', () => this.filterExpenses());
        document.getElementById('filter-status').addEventListener('change', () => this.filterExpenses());
        document.getElementById('filter-date-from').addEventListener('change', () => this.filterExpenses());
        document.getElementById('filter-date-to').addEventListener('change', () => this.filterExpenses());
        document.getElementById('clear-filters-btn').addEventListener('click', () => this.clearFilters());

        // Settings
        document.getElementById('add-category-btn').addEventListener('click', () => this.addCategory());
        document.getElementById('new-category-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addCategory();
        });
        document.getElementById('setup-recurring-btn').addEventListener('click', () => this.setupRecurringExpense());

        // Drag and drop for receipts
        this.setupDragDrop();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'n':
                        e.preventDefault();
                        this.showExpenseModal();
                        break;
                    case 'e':
                        e.preventDefault();
                        this.exportData();
                        break;
                    case 'f':
                        e.preventDefault();
                        document.getElementById('search-expenses').focus();
                        break;
                }
            }
            
            // Tab navigation with Alt + number
            if (e.altKey && e.key >= '1' && e.key <= '7') {
                e.preventDefault();
                const tabs = ['dashboard', 'expenses', 'budget', 'analytics', 'approvals', 'receipts', 'settings'];
                const index = parseInt(e.key) - 1;
                if (tabs[index]) {
                    this.switchTab(tabs[index]);
                }
            }
        });
    }

    setupDragDrop() {
        const uploadZone = document.getElementById('receipt-upload-zone');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadZone.addEventListener(eventName, () => {
                uploadZone.classList.add('dragover');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, () => {
                uploadZone.classList.remove('dragover');
            });
        });

        uploadZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            this.handleReceiptUpload({target: {files}});
        });
    }

    setupTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-color-scheme', prefersDark ? 'dark' : 'light');
        this.updateThemeToggle();
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        this.updateThemeToggle();
        this.showNotification('Theme updated', 'success');
    }

    updateThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        const isDark = document.documentElement.getAttribute('data-color-scheme') === 'dark';
        toggle.textContent = isDark ? '☀️' : '🌙';
    }

    showLogin() {
        document.getElementById('login-modal').classList.remove('hidden');
        document.getElementById('app').classList.add('hidden');
    }

    hideLogin() {
        document.getElementById('login-modal').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const account = this.demoAccounts.find(acc => acc.email === email && acc.password === password);
        
        if (account) {
            this.currentUser = account;
            document.getElementById('user-name').textContent = account.name;
            this.hideLogin();
            this.initializeApp();
            this.showNotification(`Welcome, ${account.name}!`, 'success');
        } else {
            this.showNotification('Invalid credentials. Please try a demo account.', 'error');
        }
    }

    logout() {
        this.currentUser = null;
        this.showLogin();
        this.showNotification('Logged out successfully', 'info');
    }

    initializeApp() {
        this.populateFormOptions();
        this.switchTab('dashboard');
        this.setupRecurringReminders();
    }

    populateFormOptions() {
        // Categories
        const categorySelects = [document.getElementById('expense-category'), document.getElementById('filter-category')];
        categorySelects.forEach(select => {
            if (select) {
                select.innerHTML = select.id === 'filter-category' ? '<option value="">All Categories</option>' : '';
                this.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    select.appendChild(option);
                });
            }
        });

        // Payment Methods
        const paymentSelect = document.getElementById('expense-payment-method');
        if (paymentSelect) {
            this.paymentMethods.forEach(method => {
                const option = document.createElement('option');
                option.value = method;
                option.textContent = method;
                paymentSelect.appendChild(option);
            });
        }

        // Departments
        const departmentSelect = document.getElementById('expense-department');
        if (departmentSelect) {
            this.departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept;
                option.textContent = dept;
                departmentSelect.appendChild(option);
            });
        }

        // Currencies
        const currencySelects = [document.getElementById('expense-currency'), document.getElementById('default-currency')];
        currencySelects.forEach(select => {
            if (select) {
                this.currencies.forEach(currency => {
                    const option = document.createElement('option');
                    option.value = currency.code;
                    option.textContent = `${currency.code} - ${currency.name}`;
                    select.appendChild(option);
                });
            }
        });

        // Set default date
        document.getElementById('expense-date').value = new Date().toISOString().split('T')[0];
    }

    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;

        // Load tab-specific content
        switch(tabName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'expenses':
                this.loadExpenses();
                break;
            case 'budget':
                this.loadBudget();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
            case 'approvals':
                this.loadApprovals();
                break;
            case 'receipts':
                this.loadReceipts();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    loadDashboard() {
        this.updateDashboardMetrics();
        this.createDashboardCharts();
        this.loadRecentExpenses();
    }

    updateDashboardMetrics() {
        const totalExpenses = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const pendingApprovals = this.expenses.filter(exp => exp.status === 'Pending').length;
        const currentMonth = new Date().getMonth();
        const monthlyExpenses = this.expenses.filter(exp => 
            new Date(exp.date).getMonth() === currentMonth
        ).reduce((sum, exp) => sum + exp.amount, 0);
        
        const totalBudget = this.budgets.reduce((sum, budget) => sum + budget.monthlyBudget, 0);
        const totalSpent = this.budgets.reduce((sum, budget) => sum + budget.spent, 0);
        const budgetUsage = Math.round((totalSpent / totalBudget) * 100);

        document.getElementById('total-expenses').textContent = this.formatCurrency(totalExpenses);
        document.getElementById('pending-approvals').textContent = pendingApprovals;
        document.getElementById('monthly-expenses').textContent = this.formatCurrency(monthlyExpenses);
        document.getElementById('budget-usage').textContent = `${budgetUsage}%`;
    }

    createDashboardCharts() {
        // Expense Trend Chart
        this.createExpenseTrendChart();
        
        // Category Breakdown Chart
        this.createCategoryChart();
    }

    createExpenseTrendChart() {
        const ctx = document.getElementById('expense-trend-chart');
        if (this.charts.expenseTrend) {
            this.charts.expenseTrend.destroy();
        }

        // Generate last 6 months data
        const months = [];
        const data = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            months.push(date.toLocaleDateString('en-US', { month: 'short' }));
            
            // Simulate data with some variation
            const baseAmount = 3000 + Math.random() * 2000;
            data.push(Math.round(baseAmount));
        }

        this.charts.expenseTrend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Monthly Expenses',
                    data: data,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    createCategoryChart() {
        const ctx = document.getElementById('category-chart');
        if (this.charts.category) {
            this.charts.category.destroy();
        }

        // Calculate category totals
        const categoryTotals = {};
        this.expenses.forEach(exp => {
            categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
        });

        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

        this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    loadRecentExpenses() {
        const recentExpenses = this.expenses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        const container = document.getElementById('recent-expenses-list');
        container.innerHTML = recentExpenses.map(expense => `
            <div class="expense-item">
                <div class="expense-info">
                    <div class="expense-amount">${this.formatCurrency(expense.amount)}</div>
                    <div class="expense-category">${expense.category}</div>
                    <div class="expense-description">${expense.description}</div>
                </div>
                <span class="status status--${expense.status.toLowerCase()}">${expense.status}</span>
            </div>
        `).join('');
    }

    loadExpenses() {
        this.renderExpensesTable();
    }

    renderExpensesTable() {
        const filteredExpenses = this.getFilteredExpenses();
        const container = document.getElementById('expenses-table');
        
        if (filteredExpenses.length === 0) {
            container.innerHTML = '<p>No expenses found matching your criteria.</p>';
            return;
        }

        const table = `
            <table class="expense-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredExpenses.map(expense => `
                        <tr>
                            <td>${new Date(expense.date).toLocaleDateString()}</td>
                            <td>${this.formatCurrency(expense.amount)}</td>
                            <td>${expense.category}</td>
                            <td>${expense.description}</td>
                            <td><span class="status status--${expense.status.toLowerCase()}">${expense.status}</span></td>
                            <td>
                                <div class="expense-actions">
                                    <button class="btn btn--outline btn--sm" onclick="app.editExpense(${expense.id})">Edit</button>
                                    <button class="btn btn--outline btn--sm" onclick="app.deleteExpense(${expense.id})">Delete</button>
                                    ${expense.status === 'Pending' ? `<button class="btn btn--primary btn--sm" onclick="app.approveExpense(${expense.id})">Approve</button>` : ''}
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        
        container.innerHTML = table;
    }

    getFilteredExpenses() {
        let filtered = [...this.expenses];
        
        const searchTerm = document.getElementById('search-expenses').value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(exp => 
                exp.description.toLowerCase().includes(searchTerm) ||
                exp.category.toLowerCase().includes(searchTerm) ||
                exp.submittedBy.toLowerCase().includes(searchTerm)
            );
        }

        const categoryFilter = document.getElementById('filter-category').value;
        if (categoryFilter) {
            filtered = filtered.filter(exp => exp.category === categoryFilter);
        }

        const statusFilter = document.getElementById('filter-status').value;
        if (statusFilter) {
            filtered = filtered.filter(exp => exp.status === statusFilter);
        }

        const dateFromFilter = document.getElementById('filter-date-from').value;
        if (dateFromFilter) {
            filtered = filtered.filter(exp => exp.date >= dateFromFilter);
        }

        const dateToFilter = document.getElementById('filter-date-to').value;
        if (dateToFilter) {
            filtered = filtered.filter(exp => exp.date <= dateToFilter);
        }

        return filtered;
    }

    filterExpenses() {
        this.renderExpensesTable();
    }

    clearFilters() {
        document.getElementById('search-expenses').value = '';
        document.getElementById('filter-category').value = '';
        document.getElementById('filter-status').value = '';
        document.getElementById('filter-date-from').value = '';
        document.getElementById('filter-date-to').value = '';
        this.filterExpenses();
    }

    loadBudget() {
        this.createBudgetChart();
        this.renderBudgetCategories();
    }

    createBudgetChart() {
        const ctx = document.getElementById('budget-chart');
        if (this.charts.budget) {
            this.charts.budget.destroy();
        }

        const categories = this.budgets.map(b => b.category);
        const budgetData = this.budgets.map(b => b.monthlyBudget);
        const spentData = this.budgets.map(b => b.spent);

        this.charts.budget = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Budget',
                    data: budgetData,
                    backgroundColor: '#FFC185',
                    borderColor: '#FFC185',
                    borderWidth: 1
                }, {
                    label: 'Spent',
                    data: spentData,
                    backgroundColor: '#1FB8CD',
                    borderColor: '#1FB8CD',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    renderBudgetCategories() {
        const container = document.getElementById('budget-categories-list');
        container.innerHTML = this.budgets.map(budget => {
            const percentage = Math.round((budget.spent / budget.monthlyBudget) * 100);
            const status = percentage > 90 ? 'danger' : percentage > 70 ? 'warning' : 'normal';
            
            return `
                <div class="budget-category">
                    <h4>${budget.category}</h4>
                    <div class="budget-progress">
                        <div class="progress-bar">
                            <div class="progress-fill ${status}" style="width: ${Math.min(percentage, 100)}%"></div>
                        </div>
                        <div class="budget-stats">
                            <span>Spent: ${this.formatCurrency(budget.spent)}</span>
                            <span>Budget: ${this.formatCurrency(budget.monthlyBudget)}</span>
                        </div>
                        <div class="budget-stats">
                            <span>${percentage}% used</span>
                            <span>Remaining: ${this.formatCurrency(budget.remaining)}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    loadAnalytics() {
        this.createSpendingPatternsChart();
        this.createDepartmentChart();
        this.createForecastChart();
    }

    createSpendingPatternsChart() {
        const ctx = document.getElementById('spending-patterns-chart');
        if (this.charts.spendingPatterns) {
            this.charts.spendingPatterns.destroy();
        }

        // Generate weekly spending pattern
        const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        const data = weeks.map(() => Math.random() * 2000 + 1000);

        this.charts.spendingPatterns = new Chart(ctx, {
            type: 'line',
            data: {
                labels: weeks,
                datasets: [{
                    label: 'Weekly Spending',
                    data: data,
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    createDepartmentChart() {
        const ctx = document.getElementById('department-chart');
        if (this.charts.department) {
            this.charts.department.destroy();
        }

        // Calculate department spending
        const deptSpending = {};
        this.expenses.forEach(exp => {
            deptSpending[exp.department] = (deptSpending[exp.department] || 0) + exp.amount;
        });

        const labels = Object.keys(deptSpending);
        const data = Object.values(deptSpending);
        const colors = ['#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454'];

        this.charts.department = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    createForecastChart() {
        const ctx = document.getElementById('forecast-chart');
        if (this.charts.forecast) {
            this.charts.forecast.destroy();
        }

        // Generate forecast data
        const months = [];
        const actualData = [];
        const forecastData = [];

        for (let i = 2; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            months.push(date.toLocaleDateString('en-US', { month: 'short' }));
            actualData.push(Math.random() * 2000 + 2000);
            forecastData.push(null);
        }

        for (let i = 1; i <= 3; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() + i);
            months.push(date.toLocaleDateString('en-US', { month: 'short' }));
            actualData.push(null);
            forecastData.push(Math.random() * 2000 + 2000);
        }

        this.charts.forecast = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Actual',
                    data: actualData,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: false
                }, {
                    label: 'Forecast',
                    data: forecastData,
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    borderDash: [5, 5],
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    loadApprovals() {
        this.renderPendingApprovals();
        this.updateApprovalStats();
    }

    renderPendingApprovals() {
        const pendingExpenses = this.expenses.filter(exp => exp.status === 'Pending');
        const container = document.getElementById('pending-approvals-list');

        if (pendingExpenses.length === 0) {
            container.innerHTML = '<p>No pending approvals.</p>';
            return;
        }

        container.innerHTML = pendingExpenses.map(expense => `
            <div class="approval-item">
                <div class="approval-header">
                    <h4>${expense.description}</h4>
                    <span class="status status--warning">${expense.status}</span>
                </div>
                <div class="approval-details">
                    <div><strong>Amount:</strong> ${this.formatCurrency(expense.amount)}</div>
                    <div><strong>Category:</strong> ${expense.category}</div>
                    <div><strong>Submitted by:</strong> ${expense.submittedBy}</div>
                    <div><strong>Date:</strong> ${new Date(expense.date).toLocaleDateString()}</div>
                    <div><strong>Department:</strong> ${expense.department}</div>
                    <div><strong>Project:</strong> ${expense.projectCode}</div>
                </div>
                <div class="approval-actions">
                    <button class="btn btn--primary btn--sm" onclick="app.approveExpense(${expense.id})">Approve</button>
                    <button class="btn btn--outline btn--sm" onclick="app.rejectExpense(${expense.id})">Reject</button>
                    <button class="btn btn--outline btn--sm" onclick="app.requestMoreInfo(${expense.id})">Request Info</button>
                </div>
            </div>
        `).join('');
    }

    updateApprovalStats() {
        const pendingCount = this.expenses.filter(exp => exp.status === 'Pending').length;
        const approvedCount = this.expenses.filter(exp => exp.status === 'Approved').length;
        
        document.getElementById('pending-count').textContent = `${pendingCount} Pending`;
        document.getElementById('approved-count').textContent = `${approvedCount} Approved`;
    }

    loadReceipts() {
        this.renderReceiptGallery();
    }

    renderReceiptGallery() {
        const container = document.getElementById('receipt-gallery');
        
        if (this.receipts.length === 0) {
            container.innerHTML = '<p>No receipts uploaded yet.</p>';
            return;
        }

        container.innerHTML = this.receipts.map(receipt => `
            <div class="receipt-item" onclick="app.viewReceipt(${receipt.id})">
                <div class="receipt-thumbnail">
                    ${receipt.type === 'image' ? 
                        `<img src="${receipt.url}" alt="${receipt.name}">` : 
                        '📄'
                    }
                </div>
                <div class="receipt-info">
                    <div class="receipt-name">${receipt.name}</div>
                    <div class="receipt-date">${new Date(receipt.uploadDate).toLocaleDateString()}</div>
                </div>
            </div>
        `).join('');
    }

    loadSettings() {
        this.renderCategoriesList();
        this.renderRecurringExpensesList();
    }

    renderCategoriesList() {
        const container = document.getElementById('categories-list');
        container.innerHTML = this.categories.map(category => `
            <div class="category-item">
                <span>${category}</span>
                <button class="category-remove" onclick="app.removeCategory('${category}')" title="Remove category">×</button>
            </div>
        `).join('');
    }

    renderRecurringExpensesList() {
        const container = document.getElementById('recurring-expenses-list');
        
        if (this.recurringExpenses.length === 0) {
            container.innerHTML = '<p>No recurring expenses set up.</p>';
            return;
        }

        container.innerHTML = this.recurringExpenses.map(recurring => `
            <div class="recurring-item">
                <div>
                    <strong>${recurring.description}</strong><br>
                    ${this.formatCurrency(recurring.amount)} - ${recurring.frequency}<br>
                    Next: ${new Date(recurring.nextDate).toLocaleDateString()}
                </div>
                <button class="btn btn--outline btn--sm" onclick="app.toggleRecurring(${recurring.id})">
                    ${recurring.active ? 'Disable' : 'Enable'}
                </button>
            </div>
        `).join('');
    }

    // Expense Management
    showExpenseModal(expenseId = null) {
        const modal = document.getElementById('expense-modal');
        const title = document.getElementById('expense-modal-title');
        const form = document.getElementById('expense-form');
        
        if (expenseId) {
            const expense = this.expenses.find(exp => exp.id === expenseId);
            title.textContent = 'Edit Expense';
            this.populateExpenseForm(expense);
        } else {
            title.textContent = 'Add New Expense';
            form.reset();
            document.getElementById('expense-date').value = new Date().toISOString().split('T')[0];
        }
        
        modal.classList.remove('hidden');
    }

    hideExpenseModal() {
        document.getElementById('expense-modal').classList.add('hidden');
        document.getElementById('recurring-options').classList.add('hidden');
        document.getElementById('split-categories').classList.add('hidden');
    }

    populateExpenseForm(expense) {
        document.getElementById('expense-amount').value = expense.amount;
        document.getElementById('expense-category').value = expense.category;
        document.getElementById('expense-date').value = expense.date;
        document.getElementById('expense-description').value = expense.description;
        document.getElementById('expense-payment-method').value = expense.paymentMethod;
        document.getElementById('expense-department').value = expense.department;
        document.getElementById('expense-project').value = expense.projectCode;
        document.getElementById('expense-currency').value = expense.currency || 'USD';
    }

    handleExpenseSubmit(e) {
        e.preventDefault();
        this.showLoadingOverlay();

        setTimeout(() => {
            const formData = new FormData(e.target);
            const expenseData = {
                id: Date.now(),
                amount: parseFloat(document.getElementById('expense-amount').value),
                category: document.getElementById('expense-category').value,
                date: document.getElementById('expense-date').value,
                description: document.getElementById('expense-description').value,
                paymentMethod: document.getElementById('expense-payment-method').value,
                department: document.getElementById('expense-department').value,
                projectCode: document.getElementById('expense-project').value,
                currency: document.getElementById('expense-currency').value,
                status: 'Pending',
                submittedBy: this.currentUser.name,
                receipt: null
            };

            this.expenses.push(expenseData);
            this.updateBudgetSpending(expenseData);
            this.hideExpenseModal();
            this.hideLoadingOverlay();
            this.showNotification('Expense added successfully!', 'success');

            if (this.currentTab === 'dashboard') {
                this.loadDashboard();
            } else if (this.currentTab === 'expenses') {
                this.loadExpenses();
            }

            // Handle recurring expense
            if (document.getElementById('expense-recurring').checked) {
                this.createRecurringExpense(expenseData);
            }
        }, 1000);
    }

    updateBudgetSpending(expense) {
        const budget = this.budgets.find(b => b.category === expense.category);
        if (budget) {
            budget.spent += expense.amount;
            budget.remaining = budget.monthlyBudget - budget.spent;
            
            // Check for budget alerts
            const percentage = (budget.spent / budget.monthlyBudget) * 100;
            if (percentage >= 90) {
                this.showNotification(`Budget alert: ${expense.category} is at ${Math.round(percentage)}% of monthly budget`, 'warning');
            }
        }
    }

    editExpense(id) {
        this.showExpenseModal(id);
    }

    deleteExpense(id) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenses = this.expenses.filter(exp => exp.id !== id);
            this.showNotification('Expense deleted successfully', 'success');
            if (this.currentTab === 'expenses') {
                this.loadExpenses();
            }
        }
    }

    approveExpense(id) {
        const expense = this.expenses.find(exp => exp.id === id);
        if (expense) {
            expense.status = 'Approved';
            this.showNotification(`Expense approved: ${expense.description}`, 'success');
            
            if (this.currentTab === 'approvals') {
                this.loadApprovals();
            }
            if (this.currentTab === 'dashboard') {
                this.loadDashboard();
            }
        }
    }

    rejectExpense(id) {
        const expense = this.expenses.find(exp => exp.id === id);
        if (expense && confirm('Are you sure you want to reject this expense?')) {
            expense.status = 'Rejected';
            this.showNotification(`Expense rejected: ${expense.description}`, 'error');
            
            if (this.currentTab === 'approvals') {
                this.loadApprovals();
            }
        }
    }

    requestMoreInfo(id) {
        const expense = this.expenses.find(exp => exp.id === id);
        if (expense) {
            this.showNotification(`More information requested for: ${expense.description}`, 'info');
        }
    }

    toggleRecurringOptions(show) {
        const options = document.getElementById('recurring-options');
        if (show) {
            options.classList.remove('hidden');
        } else {
            options.classList.add('hidden');
        }
    }

    toggleSplitOptions(show) {
        const options = document.getElementById('split-categories');
        if (show) {
            options.classList.remove('hidden');
            // Add split category controls here
        } else {
            options.classList.add('hidden');
        }
    }

    createRecurringExpense(expenseData) {
        const frequency = document.getElementById('recurring-frequency').value;
        const endDate = document.getElementById('recurring-end-date').value;
        
        const recurring = {
            id: Date.now(),
            amount: expenseData.amount,
            category: expenseData.category,
            description: expenseData.description,
            frequency: frequency,
            endDate: endDate,
            nextDate: this.calculateNextDate(new Date(), frequency),
            active: true
        };
        
        this.recurringExpenses.push(recurring);
        this.showNotification('Recurring expense created!', 'success');
    }

    calculateNextDate(currentDate, frequency) {
        const date = new Date(currentDate);
        switch(frequency) {
            case 'weekly':
                date.setDate(date.getDate() + 7);
                break;
            case 'monthly':
                date.setMonth(date.getMonth() + 1);
                break;
            case 'quarterly':
                date.setMonth(date.getMonth() + 3);
                break;
            case 'yearly':
                date.setFullYear(date.getFullYear() + 1);
                break;
        }
        return date.toISOString().split('T')[0];
    }

    setupRecurringReminders() {
        // Check for recurring expenses due today
        const today = new Date().toISOString().split('T')[0];
        const dueRecurring = this.recurringExpenses.filter(r => r.active && r.nextDate <= today);
        
        if (dueRecurring.length > 0) {
            this.showNotification(`${dueRecurring.length} recurring expense(s) are due today`, 'info');
        }
    }

    // Receipt Management
    handleReceiptUpload(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const receipt = {
                id: Date.now() + Math.random(),
                name: file.name,
                type: file.type.startsWith('image') ? 'image' : 'document',
                size: file.size,
                uploadDate: new Date().toISOString(),
                url: URL.createObjectURL(file)
            };
            
            this.receipts.push(receipt);
            
            // Simulate OCR processing
            this.simulateOCR(receipt);
        });
        
        this.showNotification(`${files.length} receipt(s) uploaded successfully`, 'success');
        if (this.currentTab === 'receipts') {
            this.loadReceipts();
        }
    }

    handleModalReceiptUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const preview = document.getElementById('uploaded-receipt-preview');
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.style.maxWidth = '200px';
            img.style.maxHeight = '150px';
            preview.innerHTML = '';
            preview.appendChild(img);
            preview.classList.remove('hidden');
        }
    }

    simulateOCR(receipt) {
        // Simulate OCR processing delay
        setTimeout(() => {
            const extractedData = {
                amount: (Math.random() * 500 + 10).toFixed(2),
                date: new Date().toISOString().split('T')[0],
                vendor: 'Sample Vendor',
                category: this.categories[Math.floor(Math.random() * this.categories.length)]
            };
            
            this.showNotification(`OCR completed for ${receipt.name}. Amount: $${extractedData.amount}`, 'success');
            
            // Auto-populate expense form if modal is open
            if (!document.getElementById('expense-modal').classList.contains('hidden')) {
                document.getElementById('expense-amount').value = extractedData.amount;
                document.getElementById('expense-date').value = extractedData.date;
                document.getElementById('expense-category').value = extractedData.category;
                document.getElementById('expense-description').value = `Receipt from ${extractedData.vendor}`;
            }
        }, 2000);
    }

    viewReceipt(id) {
        const receipt = this.receipts.find(r => r.id === id);
        if (receipt) {
            const modal = document.getElementById('receipt-modal');
            const details = document.getElementById('receipt-details');
            
            details.innerHTML = `
                <h3>${receipt.name}</h3>
                <p><strong>Upload Date:</strong> ${new Date(receipt.uploadDate).toLocaleDateString()}</p>
                <p><strong>File Size:</strong> ${(receipt.size / 1024).toFixed(1)} KB</p>
                ${receipt.type === 'image' ? `<img src="${receipt.url}" style="max-width: 100%; height: auto;">` : '<p>Document preview not available</p>'}
            `;
            
            modal.classList.remove('hidden');
        }
    }

    hideReceiptModal() {
        document.getElementById('receipt-modal').classList.add('hidden');
    }

    // Settings Management
    addCategory() {
        const input = document.getElementById('new-category-input');
        const category = input.value.trim();
        
        if (category && !this.categories.includes(category)) {
            this.categories.push(category);
            input.value = '';
            this.renderCategoriesList();
            this.populateFormOptions();
            this.showNotification(`Category "${category}" added successfully`, 'success');
        }
    }

    removeCategory(category) {
        if (confirm(`Are you sure you want to remove the category "${category}"?`)) {
            this.categories = this.categories.filter(cat => cat !== category);
            this.renderCategoriesList();
            this.populateFormOptions();
            this.showNotification(`Category "${category}" removed`, 'success');
        }
    }

    setupRecurringExpense() {
        this.showExpenseModal();
        document.getElementById('expense-recurring').checked = true;
        this.toggleRecurringOptions(true);
    }

    toggleRecurring(id) {
        const recurring = this.recurringExpenses.find(r => r.id === id);
        if (recurring) {
            recurring.active = !recurring.active;
            this.renderRecurringExpensesList();
            this.showNotification(
                `Recurring expense ${recurring.active ? 'enabled' : 'disabled'}`, 
                'success'
            );
        }
    }

    // Data Export
    exportData() {
        const data = {
            expenses: this.expenses,
            budgets: this.budgets,
            categories: this.categories
        };
        
        const csv = this.convertToCSV(this.expenses);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Data exported successfully', 'success');
    }

    convertToCSV(data) {
        const headers = ['Date', 'Amount', 'Category', 'Description', 'Status', 'Department', 'Submitted By'];
        const rows = data.map(item => [
            item.date,
            item.amount,
            item.category,
            item.description,
            item.status,
            item.department,
            item.submittedBy
        ]);
        
        return [headers, ...rows].map(row => 
            row.map(field => `"${field}"`).join(',')
        ).join('\n');
    }

    // Utility Functions
    formatCurrency(amount, currency = 'USD') {
        const currencyObj = this.currencies.find(c => c.code === currency);
        const symbol = currencyObj ? currencyObj.symbol : '$';
        return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div>${message}</div>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        container.appendChild(notification);
        
        // Update notification badge
        const badge = document.getElementById('notification-badge');
        const count = container.children.length;
        badge.textContent = count;
        badge.classList.toggle('hidden', count === 0);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
                const newCount = container.children.length;
                badge.textContent = newCount;
                badge.classList.toggle('hidden', newCount === 0);
            }
        }, 5000);
    }

    showNotifications() {
        const container = document.getElementById('notification-container');
        if (container.children.length === 0) {
            this.showNotification('No new notifications', 'info');
        }
    }

    showLoadingOverlay() {
        document.getElementById('loading-overlay').classList.remove('hidden');
    }

    hideLoadingOverlay() {
        document.getElementById('loading-overlay').classList.add('hidden');
    }
}

// Global functions for event handlers
window.showExpenseModal = () => app.showExpenseModal();
window.hideExpenseModal = () => app.hideExpenseModal();
window.hideReceiptModal = () => app.hideReceiptModal();
window.switchTab = (tab) => app.switchTab(tab);

// Initialize the application
const app = new ExpenseTrackerPro();

// Make app globally accessible for inline event handlers
window.app = app;