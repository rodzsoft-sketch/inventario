(function () {
    const STORAGE_KEY = 'gestionBMStateV1';
    const VALID_USERS = {
        'admin': { password: 'admin123', role: 'admin', displayName: 'Admin' },
        'usuario1': { password: 'user123', role: 'usuario', displayName: 'Usuario 1' },
        'usuario2': { password: 'user123', role: 'usuario', displayName: 'Usuario 2' },
        'usuario3': { password: 'user123', role: 'usuario', displayName: 'Usuario 3' }
    };
    const pageId = document.body?.dataset?.page || '';

    function createSystemHelpModal() {
        if (document.getElementById('systemHelpModal')) {
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'systemHelpModal';
        modal.className = 'fixed inset-0 z-[70] hidden items-center justify-center bg-slate-900/60 px-lg';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'systemHelpTitle');
        modal.innerHTML = `
            <div class="w-full max-w-4xl rounded-[28px] border border-outline-variant bg-surface-container-lowest p-lg shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
                <div class="flex items-start justify-between gap-md mb-lg">
                    <div>
                        <p class="text-label-sm font-label-sm text-on-surface-variant">Ayuda del sistema</p>
                        <h3 id="systemHelpTitle" class="text-headline-sm font-headline-sm text-on-surface">Manual de uso</h3>
                    </div>
                    <button type="button" data-close-help-modal class="material-symbols-outlined rounded-full p-2 hover:bg-surface-container-high transition-colors" aria-label="Cerrar ayuda">close</button>
                </div>

                <div class="grid gap-md lg:grid-cols-[1.2fr_0.8fr]">
                    <div class="space-y-md text-sm text-on-surface-variant">
                        <div class="rounded-2xl border border-primary/30 bg-primary-container/10 p-md">
                            <p class="text-label-lg font-label-lg text-primary">¿Cómo funciona este sistema?</p>
                        </div>

                        <div class="grid gap-sm md:grid-cols-2">
                            <div class="rounded-2xl bg-surface-container-high p-md">
                                <p class="text-label-md font-label-md text-primary mb-xs">Dashboard</p>
                                <p>Resumen general del inventario, movimientos y reportes del sistema.</p>
                            </div>
                            <div class="rounded-2xl bg-surface-container-high p-md">
                                <p class="text-label-md font-label-md text-primary mb-xs">BM1</p>
                                <p>Registra, consulta y exporta el inventario anual de bienes.</p>
                            </div>
                            <div class="rounded-2xl bg-surface-container-high p-md">
                                <p class="text-label-md font-label-md text-primary mb-xs">BM2</p>
                                <p>Controla reasignaciones, traslados y servicios técnicos.</p>
                            </div>
                            <div class="rounded-2xl bg-surface-container-high p-md">
                                <p class="text-label-md font-label-md text-primary mb-xs">BM3</p>
                                <p>Gestiona bajas y desincorporaciones por daño, robo u obsolescencia.</p>
                            </div>
                        </div>

                        <div class="rounded-2xl bg-surface-container-high p-md">
                            <p class="text-label-md font-label-md text-on-surface mb-sm">Flujo recomendado</p>
                            <ol class="list-decimal pl-lg space-y-2">
                                <li>Inicia sesión con tu usuario.</li>
                                <li>Revisa el dashboard para ver el estado general.</li>
                                <li>Accede al módulo requerido según la tarea.</li>
                                <li>Completa o consulta la información antes de guardar.</li>
                                <li>Verifica reportes y movimientos para mantener el inventario actualizado.</li>
                            </ol>
                        </div>
                    </div>

                    <div class="space-y-md">
                        <div class="rounded-2xl border border-outline-variant bg-surface-container-high p-md">
                            <p class="text-label-md font-label-md text-on-surface mb-sm">Objetivo del sistema</p>
                            <p>Controlar bienes muebles, mantener trazabilidad de cada movimiento y facilitar la gestión administrativa del departamento.</p>
                        </div>
                        <div class="rounded-2xl border border-outline-variant bg-surface-container-high p-md">
                            <p class="text-label-md font-label-md text-on-surface mb-sm">BM4</p>
                            <p>Genera reportes mensuales con información clave para análisis interno y toma de decisiones.</p>
                        </div>
                        <div class="rounded-2xl border border-outline-variant bg-surface-container-high p-md">
                            <p class="text-label-md font-label-md text-on-surface mb-sm">Consejos</p>
                            <ul class="list-disc pl-lg space-y-2">
                                <li>Verifica secciones y cantidades antes de guardar.</li>
                                <li>Consulta reportes periódicamente.</li>
                                <li>Confirma respaldos y bajas con el responsable.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="mt-lg flex flex-col sm:flex-row justify-end gap-sm">
                    <button type="button" id="downloadHelpManual" class="rounded-lg bg-primary px-md py-2 text-on-primary hover:opacity-90 transition-opacity">Descargar manual</button>
                    <button type="button" data-close-help-modal class="rounded-lg border border-outline-variant px-md py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors">Cerrar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeButtons = modal.querySelectorAll('[data-close-help-modal]');
        closeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            });
        });

        const downloadButton = document.getElementById('downloadHelpManual');
        if (downloadButton) {
            downloadButton.addEventListener('click', () => {
                const manualContent = `
MANUAL DEL SISTEMA DE BIENES MUEBLES

1. Dashboard
El dashboard muestra el resumen general del sistema, incluyendo inventario, movimientos y reportes.

2. BM1 - Inventario Anual
Registra y consulta bienes. Permite exportar el listado y mantener actualizado el inventario del departamento.

3. BM2 - Movimientos
Gestiona reasignaciones, traslados y servicios técnicos. Cada movimiento se registra con estado, sección y fecha.

4. BM3 - Desincorporación
Se usa para registrar bajas por daño, obsolescencia, robo u otros motivos.

5. BM4 - Reporte Mensual
Genera reportes del mes para revisar la cantidad, valor y estado de los bienes.

Flujo recomendado
1. Inicia sesión.
2. Consulta el dashboard.
3. Selecciona el módulo correspondiente.
4. Guarda la información correctamente.
5. Revisa reportes y movimientos para mantener trazabilidad.
`;
                const blob = new Blob([manualContent], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'manual-del-sistema.txt';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            });
        }
    }

    function openSystemHelpModal() {
        createSystemHelpModal();
        const modal = document.getElementById('systemHelpModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    }

    function bindHelpButtons() {
        const helpButtons = document.querySelectorAll('[data-help-button], [data-icon="help"]');
        if (!helpButtons.length) {
            return;
        }

        createSystemHelpModal();

        helpButtons.forEach((button) => {
            button.type = 'button';
            button.setAttribute('title', 'Abrir ayuda del sistema');
            button.setAttribute('aria-label', 'Abrir ayuda del sistema');
            button.style.cursor = 'pointer';
            button.removeEventListener('click', openSystemHelpModal);
            button.addEventListener('click', openSystemHelpModal);
        });
    }

    function getDefaultState() {
        return {
            auth: {
                isLoggedIn: false,
                user: '',
                role: 'usuario'
            },
            inventory: [],
            movements: [],
            desincorporations: [],
            reports: []
        };
    }

    function hasLegacyDemoData(state) {
        const inventory = Array.isArray(state?.inventory) ? state.inventory : [];
        return inventory.some(item => {
            const description = String(item?.description || '');
            const order = String(item?.order || '');
            return description.includes('Escritorio Ejecutivo') || order === '1001' || order === '1002' || order === '1003';
        });
    }

    function normalizeSectionValue(section) {
        const rawValue = String(section || '').trim();
        const normalized = rawValue.toLowerCase();

        const sectionMap = {
            '2': 'Deposito 01',
            '3': 'Deposito 02',
            '5': 'Archivo',
            '6': 'Sala de Juntas Interna',
            'seccion 2': 'Deposito 01',
            'sección 2': 'Deposito 01',
            'seccion 3': 'Deposito 02',
            'sección 3': 'Deposito 02',
            'seccion 5': 'Archivo',
            'sección 5': 'Archivo',
            'seccion 6': 'Sala de Juntas Interna',
            'sección 6': 'Sala de Juntas Interna',
            'deposito 01': 'Deposito 01',
            'deposito 02': 'Deposito 02',
            'archivo': 'Archivo',
            'sala de juntas interna': 'Sala de Juntas Interna'
        };

        return sectionMap[normalized] || rawValue;
    }

    function loadState() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const defaults = getDefaultState();

            if (!stored) {
                return defaults;
            }

            const parsed = JSON.parse(stored);

            if (hasLegacyDemoData(parsed)) {
                localStorage.removeItem(STORAGE_KEY);
                return defaults;
            }

            const inventory = Array.isArray(parsed.inventory) && parsed.inventory.length ? parsed.inventory : defaults.inventory;
            return {
                ...defaults,
                ...parsed,
                auth: {
                    ...defaults.auth,
                    ...(parsed.auth || {})
                },
                inventory: inventory.map(item => ({
                    ...item,
                    section: normalizeSectionValue(item.section)
                })),
                movements: Array.isArray(parsed.movements) && parsed.movements.length ? parsed.movements : defaults.movements,
                desincorporations: Array.isArray(parsed.desincorporations) && parsed.desincorporations.length ? parsed.desincorporations : defaults.desincorporations,
                reports: Array.isArray(parsed.reports) && parsed.reports.length ? parsed.reports : defaults.reports
            };
        } catch (error) {
            console.error('No se pudo cargar el estado del sistema.', error);
            return getDefaultState();
        }
    }

    function saveState(state) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('es-BO', {
            style: 'currency',
            currency: 'BOB',
            maximumFractionDigits: 0
        }).format(value);
    }

    function calculateBm1Total(quantity, value) {
        const parsedQuantity = Number(quantity);
        const parsedValue = Number(value);

        if (!Number.isFinite(parsedQuantity) || !Number.isFinite(parsedValue)) {
            return 0;
        }

        return parsedQuantity * parsedValue;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    let bm1EditingItemId = null;

    function getBm1ModalElements() {
        return {
            modal: document.getElementById('bm1-form-modal'),
            closeModal: document.getElementById('bm1-close-form'),
            cancelModal: document.getElementById('bm1-cancel-form'),
            form: document.getElementById('bm1-register-form'),
            formTitle: document.getElementById('bm1-form-title'),
            formSubtitle: document.getElementById('bm1-form-subtitle'),
            formMessage: document.getElementById('bm1-form-message')
        };
    }

    function openBm1Modal(state, itemId = null) {
        const { modal, formTitle, formSubtitle, formMessage, form } = getBm1ModalElements();
        bm1EditingItemId = itemId;

        if (form) {
            form.dataset.editingItemId = itemId ? String(itemId) : '';
        }

        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
        if (formTitle) {
            formTitle.textContent = itemId ? 'Editar bien' : 'Registrar nuevo bien';
        }
        if (formSubtitle) {
            formSubtitle.textContent = itemId ? 'Modifica los campos del activo seleccionado.' : 'Completa los datos del activo para registrarlo.';
        }
        if (formMessage) {
            formMessage.textContent = '';
            formMessage.className = 'text-sm text-on-surface-variant';
        }
        if (form) {
            form.reset();
            if (itemId) {
                const item = state.inventory.find(entry => entry.id === itemId);
                if (item) {
                    form.elements.group.value = item.group || '';
                    form.elements.subgroup.value = item.subgroup || '';
                    form.elements.section.value = item.section || '';
                    form.elements.quantity.value = item.quantity || '';
                    form.elements.order.value = item.order || '';
                    form.elements.description.value = item.description || '';
                    form.elements.value.value = item.value || '';
                }
            }
        }
    }

    function closeBm1Modal() {
        const { modal, form, formMessage } = getBm1ModalElements();
        bm1EditingItemId = null;

        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
        if (form) {
            form.dataset.editingItemId = '';
            form.reset();
        }
        if (formMessage) {
            formMessage.textContent = '';
            formMessage.className = 'text-sm text-on-surface-variant';
        }
    }

    function initAuth(state) {
        document.querySelectorAll('[data-logout="true"]').forEach(link => {
            link.remove();
        });

        if (pageId === 'login') {
            if (state.auth.isLoggedIn) {
                const statusMessage = document.getElementById('statusMessage');
                if (statusMessage) {
                    statusMessage.textContent = `Ya tienes una sesión activa como ${state.auth.user} (${state.auth.role}). Si necesitas iniciar con otro usuario, puedes continuar con cualquier correo y contraseña.`;
                    statusMessage.className = 'status success';
                }
            }
            return;
        }

        if (!state.auth.isLoggedIn) {
            window.location.replace('login.html');
            return;
        }

        if (state.auth.role !== 'admin' && (pageId === 'bm3' || pageId === 'bm4')) {
            window.location.replace('index.html');
            return;
        }
    }

    function updateAuthUI(state) {
        const nameElements = document.querySelectorAll('#currentUserName');
        const roleElements = document.querySelectorAll('#currentUserRole');
        const displayName = state.auth.user || 'Usuario';
        const displayRole = state.auth.role === 'admin' ? 'Administrador' : 'Usuario';

        nameElements.forEach(el => {
            el.textContent = displayName;
        });
        roleElements.forEach(el => {
            el.textContent = displayRole;
        });

        document.querySelectorAll('[data-admin-only]').forEach(el => {
            if (state.auth.role !== 'admin') {
                el.classList.add('hidden');
            } else {
                el.classList.remove('hidden');
            }
        });
    }

    function bindLoginForm(state) {
        const form = document.getElementById('loginForm');
        const statusMessage = document.getElementById('statusMessage');
        const submitButton = document.getElementById('submitButton');

        if (!form) {
            return;
        }

        const setStatus = (text, className, hidden = false) => {
            if (!statusMessage) {
                return;
            }
            statusMessage.textContent = text;
            statusMessage.className = className;
            statusMessage.hidden = hidden;
        };

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            submitButton.disabled = true;
            submitButton.textContent = 'Ingresando...';
            setStatus('Validando credenciales...', 'status', false);

            const formData = new FormData(form);
            const account = formData.get('account')?.toString().trim() || '';
            const password = formData.get('password')?.toString() || '';
            const user = VALID_USERS[account];

            if (!user || user.password !== password) {
                setStatus('Usuario o contraseña incorrectos.', 'status', false);
                submitButton.disabled = false;
                submitButton.textContent = 'Entrar';
                return;
            }

            state.auth.isLoggedIn = true;
            state.auth.user = user.displayName;
            state.auth.role = user.role;
            saveState(state);

            window.setTimeout(() => {
                setStatus(`Inicio de sesión exitoso como ${user.displayName} (${user.role}). Redirigiendo al dashboard...`, 'status success', false);
                window.location.href = 'index.html';
            }, 700);
        });
    }

    function bindActions(state) {
        const addDashboard = document.getElementById('dashboard-new-record');
        if (addDashboard) {
            addDashboard.addEventListener('click', () => {
                openBm1Modal(state);
            });
        }

        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                state.auth = {
                    isLoggedIn: false,
                    user: '',
                    role: 'usuario'
                };
                saveState(state);
                window.location.href = 'login.html';
            });
        }

        const addBm1 = document.getElementById('bm1-add');
        const exportButton = document.getElementById('bm1-export');
        const { modal, closeModal, cancelModal, form, formMessage } = getBm1ModalElements();

        if (addBm1) {
            addBm1.addEventListener('click', () => openBm1Modal(state));
        }
        if (exportButton) {
            exportButton.addEventListener('click', () => {
                const selectedIds = new Set(window.__bm1SelectedIds || []);
                const filteredItems = state.inventory.filter(item => {
                    const selectedSection = window.__bm1SelectedSection || 'all';
                    const matchesSection = selectedSection === 'all' || item.section === selectedSection;
                    return matchesSection && (selectedIds.size === 0 || selectedIds.has(item.id));
                });

                if (!filteredItems.length) {
                    window.alert('No hay registros para exportar.');
                    return;
                }

                const rows = filteredItems.map(item => [
                    item.group,
                    item.subgroup,
                    item.section,
                    item.quantity,
                    item.order,
                    item.description,
                    item.value,
                    calculateBm1Total(item.quantity, item.value)
                ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(','));

                const csvContent = [
                    'Grupo,Sub-Grupo,Sección,Cantidad,Nro de Orden,Descripción,Valor unitario Bs,Valor total Bs',
                    ...rows
                ].join('\n');

                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `bienes-muebles-${new Date().toISOString().slice(0, 10)}.csv`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            });
        }
        if (closeModal) {
            closeModal.addEventListener('click', closeBm1Modal);
        }
        if (cancelModal) {
            cancelModal.addEventListener('click', closeBm1Modal);
        }
        if (modal) {
            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeBm1Modal();
                }
            });
        }
        if (form) {
            const setOrderFieldState = (isDuplicate = false) => {
                const orderInput = form.elements.order;
                if (!orderInput) {
                    return;
                }

                orderInput.classList.remove('border-outline-variant', 'border-red-500', 'bg-red-50', 'text-error');

                if (isDuplicate) {
                    orderInput.classList.add('border-red-500', 'bg-red-50', 'text-error');
                } else {
                    orderInput.classList.add('border-outline-variant');
                }
            };

            form.querySelectorAll('input[name="group"], input[name="subgroup"], input[name="order"]').forEach((field) => {
                field.addEventListener('input', () => {
                    field.value = field.value.replace(/\D/g, '').slice(0, 9);

                    if (field.name === 'order') {
                        const currentEditingId = form.dataset.editingItemId ? Number(form.dataset.editingItemId) : bm1EditingItemId;
                        const isDuplicate = state.inventory.some(item => item.id !== currentEditingId && String(item.order) === String(field.value));
                        setOrderFieldState(isDuplicate);

                        if (formMessage && formMessage.textContent && formMessage.textContent.includes('ya está registrado')) {
                            formMessage.textContent = '';
                            formMessage.className = 'text-sm text-on-surface-variant';
                        }
                    }
                });
            });

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(form);
                const fields = {
                    group: formData.get('group').toString().trim(),
                    subgroup: formData.get('subgroup').toString().trim(),
                    section: formData.get('section').toString().trim(),
                    quantity: formData.get('quantity').toString().trim(),
                    order: formData.get('order').toString().trim(),
                    description: formData.get('description').toString().trim(),
                    value: Number(formData.get('value')) || 0
                };

                const numericOnlyFields = ['group', 'subgroup', 'order'];
                numericOnlyFields.forEach((fieldName) => {
                    fields[fieldName] = fields[fieldName].replace(/\D/g, '');
                });

                const requiredFields = ['group', 'subgroup', 'section', 'quantity', 'order', 'description', 'value'];
                const missingField = requiredFields.find(field => !String(fields[field]).trim());
                const quantity = Number(fields.quantity);
                const value = Number(fields.value);
                const description = String(fields.description || '').trim();

                if (missingField) {
                    if (formMessage) {
                        formMessage.textContent = 'Completa todos los campos antes de guardar.';
                        formMessage.className = 'text-sm text-error';
                    }
                    return;
                }

                if (!Number.isFinite(quantity) || quantity < 1) {
                    if (formMessage) {
                        formMessage.textContent = 'La cantidad debe ser un número mayor a cero.';
                        formMessage.className = 'text-sm text-error';
                    }
                    return;
                }

                if (!Number.isFinite(value) || value < 0) {
                    if (formMessage) {
                        formMessage.textContent = 'El valor unitario debe ser un número mayor o igual a cero.';
                        formMessage.className = 'text-sm text-error';
                    }
                    return;
                }

                if (description.length > 50) {
                    if (formMessage) {
                        formMessage.textContent = 'La descripción no puede superar los 50 caracteres.';
                        formMessage.className = 'text-sm text-error';
                    }
                    return;
                }

                const editingItemId = form.dataset.editingItemId ? Number(form.dataset.editingItemId) : bm1EditingItemId;
                const hasDuplicateOrder = state.inventory.some(item => item.id !== editingItemId && String(item.order) === String(fields.order));

                if (hasDuplicateOrder) {
                    if (formMessage) {
                        formMessage.textContent = `El número de bien ${fields.order} ya está registrado. Ingresa otro número.`;
                        formMessage.className = 'text-sm text-error';
                    }
                    const orderInput = form.elements.order;
                    if (orderInput) {
                        orderInput.classList.add('border-red-500', 'bg-red-50', 'text-error');
                        orderInput.classList.remove('border-outline-variant');
                        orderInput.focus();
                        orderInput.select();
                    }
                    return;
                }

                setOrderFieldState(false);

                const total = calculateBm1Total(fields.quantity, fields.value);
                const normalizedDescription = description.slice(0, 50);

                if (editingItemId) {
                    state.inventory = state.inventory.map(item => item.id === editingItemId ? {
                        ...item,
                        ...fields,
                        description: normalizedDescription,
                        total
                    } : item);
                } else {
                    state.inventory.unshift({
                        id: Date.now(),
                        ...fields,
                        description: normalizedDescription,
                        total
                    });
                }

                saveState(state);
                form.reset();
                closeBm1Modal();
                renderDashboard(state);
                renderBm1(state);
            });
        }

        const addBm2 = document.getElementById('bm2-add');
        const exportBm2 = document.getElementById('bm2-export');
        const bm2Modal = document.getElementById('bm2-form-modal');
        const closeBm2Modal = document.getElementById('bm2-close-form');
        const cancelBm2Modal = document.getElementById('bm2-cancel-form');
        const bm2Form = document.getElementById('bm2-register-form');
        const bm2FormMessage = document.getElementById('bm2-form-message');

        const openBm2Modal = () => {
            if (bm2Modal) {
                bm2Modal.classList.remove('hidden');
                bm2Modal.classList.add('flex');
            }
            if (bm2Form) {
                bm2Form.reset();
                const orderSelect = bm2Form.querySelector('select[name="order"]');
                const dateField = bm2Form.querySelector('input[name="date"]');

                if (orderSelect) {
                    orderSelect.innerHTML = `
                        <option value="">Seleccione un bien del inventario</option>
                        ${state.inventory.map(item => `<option value="${escapeHtml(item.order)}">${escapeHtml(item.order)}</option>`).join('')}
                    `;
                }
                if (dateField) {
                    dateField.value = new Date().toISOString().slice(0, 10);
                }
            }
            if (bm2FormMessage) {
                bm2FormMessage.textContent = '';
                bm2FormMessage.className = 'mt-2 text-sm text-on-surface-variant';
            }
        };

        const dismissBm2Modal = () => {
            if (bm2Modal) {
                bm2Modal.classList.add('hidden');
                bm2Modal.classList.remove('flex');
            }
            if (bm2Form) {
                bm2Form.reset();
            }
            if (bm2FormMessage) {
                bm2FormMessage.textContent = '';
                bm2FormMessage.className = 'mt-2 text-sm text-on-surface-variant';
            }
        };

        if (addBm2) {
            addBm2.addEventListener('click', openBm2Modal);
        }
        if (exportBm2) {
            exportBm2.addEventListener('click', () => {
                const selectedSection = window.__bm2SelectedSection || 'all';
                const selectedDate = window.__bm2SelectedDate || '';
                const filteredItems = state.movements.filter(item => {
                    const matchesSection = selectedSection === 'all' || item.section === selectedSection;
                    const matchesDate = !selectedDate || item.date === selectedDate;
                    return matchesSection && matchesDate;
                });

                if (!filteredItems.length) {
                    window.alert('No hay movimientos para exportar.');
                    return;
                }

                const rows = filteredItems.map(item => [
                    item.order,
                    item.concept,
                    item.date,
                    item.state,
                    item.section
                ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(','));

                const csvContent = [
                    'Nro de Orden,Concepto,Fecha,Estado,Sección',
                    ...rows
                ].join('\n');

                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `movimientos-bm2-${new Date().toISOString().slice(0, 10)}.csv`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            });
        }
        if (closeBm2Modal) {
            closeBm2Modal.addEventListener('click', dismissBm2Modal);
        }
        if (cancelBm2Modal) {
            cancelBm2Modal.addEventListener('click', dismissBm2Modal);
        }
        if (bm2Modal) {
            bm2Modal.addEventListener('click', (event) => {
                if (event.target === bm2Modal) {
                    dismissBm2Modal();
                }
            });
        }
        if (bm2Form) {
            const orderField = bm2Form.querySelector('[name="order"]');

            if (orderField && orderField.tagName === 'INPUT') {
                const sanitizeOrderField = () => {
                    orderField.value = orderField.value.replace(/\D/g, '').slice(0, 9);
                };

                orderField.addEventListener('input', sanitizeOrderField);
                orderField.addEventListener('paste', (event) => {
                    event.preventDefault();
                    const pastedText = (event.clipboardData || window.clipboardData).getData('text');
                    const sanitized = pastedText.replace(/\D/g, '').slice(0, 9);
                    const start = orderField.selectionStart || 0;
                    const end = orderField.selectionEnd || 0;
                    const currentValue = orderField.value;
                    orderField.value = `${currentValue.slice(0, start)}${sanitized}${currentValue.slice(end)}`.slice(0, 9);
                    const caretPosition = Math.min(start + sanitized.length, orderField.value.length);
                    orderField.setSelectionRange(caretPosition, caretPosition);
                });
            }

            bm2Form.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(bm2Form);
                const order = formData.get('order').toString().trim();
                const concept = formData.get('concept').toString().trim();
                const date = formData.get('date').toString().trim();
                const stateValue = formData.get('state').toString().trim();
                const section = formData.get('section').toString().trim();

                if (!order || !concept || !date || !stateValue || !section) {
                    if (bm2FormMessage) {
                        bm2FormMessage.textContent = 'Completa todos los campos para registrar el movimiento.';
                        bm2FormMessage.className = 'mt-2 text-sm text-error';
                    }
                    return;
                }

                state.movements.unshift({
                    id: Date.now(),
                    order,
                    concept,
                    date,
                    state: stateValue,
                    section
                });

                const inventoryItem = state.inventory.find(item => item.order === order);
                if (inventoryItem) {
                    inventoryItem.section = section;
                }

                saveState(state);
                dismissBm2Modal();
                renderDashboard(state);
                renderBm1(state);
                renderBm2(state);
            });
        }

        const addBm3 = document.getElementById('bm3-add');
        const exportBm3 = document.getElementById('bm3-export');
        const historyBm3 = document.getElementById('bm3-history');
        const bm3Modal = document.getElementById('bm3-form-modal');
        const closeBm3Modal = document.getElementById('bm3-close-form');
        const cancelBm3Modal = document.getElementById('bm3-cancel-form');
        const bm3Form = document.getElementById('bm3-register-form');
        const bm3FormMessage = document.getElementById('bm3-form-message');

        const openBm3Modal = () => {
            if (bm3Modal) {
                bm3Modal.classList.remove('hidden');
                bm3Modal.classList.add('flex');
            }
            if (bm3Form) {
                bm3Form.reset();
                const orderSelect = bm3Form.querySelector('select[name="order"]');
                if (orderSelect) {
                    orderSelect.innerHTML = `
                        <option value="">Seleccione un bien existente</option>
                        ${state.inventory.map(item => `<option value="${escapeHtml(item.order)}">${escapeHtml(item.order)}</option>`).join('')}
                    `;
                    const descriptionField = bm3Form.querySelector('[name="description"]');
                    const quantityField = bm3Form.querySelector('input[name="quantity"]');
                    orderSelect.addEventListener('change', () => {
                        const selectedOrder = orderSelect.value;
                        const inventoryItem = state.inventory.find(item => item.order === selectedOrder);
                        if (descriptionField) {
                            descriptionField.value = inventoryItem ? inventoryItem.description : '';
                        }
                        if (quantityField) {
                            if (inventoryItem) {
                                const available = Number(inventoryItem.quantity) || 0;
                                quantityField.value = available > 0 ? '1' : '0';
                                quantityField.max = available.toString();
                                quantityField.min = '1';
                                quantityField.placeholder = `Máximo ${available}`;
                            } else {
                                quantityField.value = '';
                                quantityField.removeAttribute('max');
                                quantityField.removeAttribute('min');
                                quantityField.placeholder = '';
                            }
                        }
                    });
                }
                const descriptionField = bm3Form.querySelector('[name="description"]');
                if (descriptionField) {
                    descriptionField.value = '';
                }
                const quantityField = bm3Form.querySelector('input[name="quantity"]');
                if (quantityField) {
                    quantityField.value = '';
                    quantityField.removeAttribute('max');
                    quantityField.removeAttribute('min');
                }
                const dateField = bm3Form.querySelector('input[name="date"]');
                if (dateField) {
                    dateField.value = new Date().toISOString().slice(0, 10);
                }
            }
            if (bm3FormMessage) {
                bm3FormMessage.textContent = '';
                bm3FormMessage.className = 'mt-2 text-sm text-on-surface-variant';
            }
        };

        const dismissBm3Modal = () => {
            if (bm3Modal) {
                bm3Modal.classList.add('hidden');
                bm3Modal.classList.remove('flex');
            }
            if (bm3Form) {
                bm3Form.reset();
            }
            if (bm3FormMessage) {
                bm3FormMessage.textContent = '';
                bm3FormMessage.className = 'mt-2 text-sm text-on-surface-variant';
            }
        };

        if (addBm3) {
            addBm3.addEventListener('click', openBm3Modal);
        }
        if (historyBm3) {
            historyBm3.addEventListener('click', () => {
                const latest = state.desincorporations.slice(0, 5);
                if (!latest.length) {
                    window.alert('No hay historial de bajas registrado.');
                    return;
                }
                const details = latest.map(item => `• ${item.order} - ${item.reason} (${item.date}) - ${item.state}`).join('\n');
                window.alert(`Historial de bajas recientes:\n\n${details}`);
            });
        }
        if (exportBm3) {
            exportBm3.addEventListener('click', () => {
                const filteredItems = state.desincorporations;
                if (!filteredItems.length) {
                    window.alert('No hay solicitudes para exportar.');
                    return;
                }

                const rows = filteredItems.map(item => [
                    item.order,
                    item.reason,
                    item.date,
                    item.state
                ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(','));

                const csvContent = [
                    'Nro de Orden,Motivo,Fecha,Estado',
                    ...rows
                ].join('\n');

                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `desincorporaciones-bm3-${new Date().toISOString().slice(0, 10)}.csv`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            });
        }
        if (closeBm3Modal) {
            closeBm3Modal.addEventListener('click', dismissBm3Modal);
        }
        if (cancelBm3Modal) {
            cancelBm3Modal.addEventListener('click', dismissBm3Modal);
        }
        if (bm3Modal) {
            bm3Modal.addEventListener('click', (event) => {
                if (event.target === bm3Modal) {
                    dismissBm3Modal();
                }
            });
        }
        if (bm3Form) {
            const orderField = bm3Form.querySelector('[name="order"]');
            if (orderField && orderField.tagName === 'INPUT') {
                const sanitizeOrderField = () => {
                    orderField.value = orderField.value.replace(/\D/g, '').slice(0, 9);
                };
                orderField.addEventListener('input', sanitizeOrderField);
                orderField.addEventListener('paste', (event) => {
                    event.preventDefault();
                    const pastedText = (event.clipboardData || window.clipboardData).getData('text');
                    const sanitized = pastedText.replace(/\D/g, '').slice(0, 9);
                    const start = orderField.selectionStart || 0;
                    const end = orderField.selectionEnd || 0;
                    const currentValue = orderField.value;
                    orderField.value = `${currentValue.slice(0, start)}${sanitized}${currentValue.slice(end)}`.slice(0, 9);
                    const caretPosition = Math.min(start + sanitized.length, orderField.value.length);
                    orderField.setSelectionRange(caretPosition, caretPosition);
                });
            }

            bm3Form.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(bm3Form);
                const order = formData.get('order').toString().trim();
                const quantityValue = formData.get('quantity').toString().trim();
                const reason = formData.get('reason').toString().trim();
                const date = formData.get('date').toString().trim();
                const stateValue = formData.get('state').toString().trim();

                const quantity = Number(quantityValue);
                if (!order || !quantityValue || !reason || !date || !stateValue) {
                    if (bm3FormMessage) {
                        bm3FormMessage.textContent = 'Completa todos los campos para registrar la baja.';
                        bm3FormMessage.className = 'mt-2 text-sm text-error';
                    }
                    return;
                }
                if (!Number.isFinite(quantity) || quantity <= 0) {
                    if (bm3FormMessage) {
                        bm3FormMessage.textContent = 'Ingresa una cantidad válida para desincorporar.';
                        bm3FormMessage.className = 'mt-2 text-sm text-error';
                    }
                    return;
                }

                const inventoryItem = state.inventory.find(item => item.order === order);
                if (!inventoryItem) {
                    if (bm3FormMessage) {
                        bm3FormMessage.textContent = 'El número de orden debe corresponder a un bien existente en BM1.';
                        bm3FormMessage.className = 'mt-2 text-sm text-error';
                    }
                    return;
                }

                const maxQuantity = Number(inventoryItem.quantity) || 0;
                const alreadyRemoved = state.desincorporations
                    .filter(item => item.order === order)
                    .reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
                if (quantity + alreadyRemoved > maxQuantity) {
                    if (bm3FormMessage) {
                        bm3FormMessage.textContent = `No puedes desincorporar más de ${maxQuantity - alreadyRemoved} unidades de este bien.`;
                        bm3FormMessage.className = 'mt-2 text-sm text-error';
                    }
                    return;
                }

                const description = inventoryItem.description || '';

                state.desincorporations.unshift({
                    id: Date.now(),
                    order,
                    quantity,
                    description,
                    reason,
                    date,
                    state: stateValue
                });

                state.inventory = state.inventory.map(item => {
                    if (item.order !== order) {
                        return item;
                    }
                    const newQuantity = Math.max((Number(item.quantity) || 0) - quantity, 0);
                    return {
                        ...item,
                        quantity: newQuantity.toString(),
                        total: calculateBm1Total(newQuantity, item.value)
                    };
                });

                saveState(state);
                dismissBm3Modal();
                renderDashboard(state);
                renderBm1(state);
                renderBm3(state);
            });
        }

        const addBm4 = document.getElementById('bm4-add');
        const exportBm4 = document.getElementById('bm4-export');
        const bm4Modal = document.getElementById('bm4-form-modal');
        const closeBm4Modal = document.getElementById('bm4-close-form');
        const cancelBm4Modal = document.getElementById('bm4-cancel-form');
        const bm4Form = document.getElementById('bm4-register-form');
        const bm4FormMessage = document.getElementById('bm4-form-message');
        const applyBm4Filters = document.getElementById('bm4-apply-filters');
        const bm4DetailModal = document.getElementById('bm4-detail-modal');
        const bm4DetailTitle = document.getElementById('bm4-detail-title');
        const bm4DetailContent = document.getElementById('bm4-detail-content');
        const bm4DetailDownload = document.getElementById('bm4-detail-download');
        const bm4CloseDetail = document.getElementById('bm4-close-detail');
        const bm4DetailClose = document.getElementById('bm4-detail-close');
        const bm4PrintLayout = document.getElementById('bm4-print-layout');
        let bm4ActiveDetailId = null;

        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        const getBm4MonthNumber = (monthName) => monthNames.indexOf(monthName) + 1;

        const isSameMonthYear = (dateValue, monthName, yearValue) => {
            if (!dateValue) {
                return false;
            }
            const normalizedValue = String(dateValue).trim();
            const parsedYear = Number(normalizedValue.slice(0, 4));
            const parsedMonth = Number(normalizedValue.slice(5, 7));
            if (!Number.isFinite(parsedYear) || !Number.isFinite(parsedMonth)) {
                return false;
            }
            return parsedYear === Number(yearValue) && parsedMonth === getBm4MonthNumber(monthName);
        };

        const populateBm4AutoFields = () => {
            if (!bm4Form) {
                return;
            }

            const monthText = bm4Form.querySelector('#bm4-month-text');
            const monthHidden = bm4Form.querySelector('input[name="month"]');
            const yearInput = bm4Form.querySelector('[name="year"]');
            const sectionSelect = bm4Form.querySelector('[name="section"]');
            const currentDate = new Date();
            const currentMonthName = monthNames[currentDate.getMonth()];
            const currentYear = String(currentDate.getFullYear());

            // Mostrar mes actual como texto y mantener el valor en el campo oculto
            if (monthText) {
                monthText.textContent = currentMonthName;
            }
            if (monthHidden) {
                monthHidden.value = currentMonthName;
            }
            if (yearInput) {
                yearInput.value = yearInput.value || currentYear;
            }

            const selectedMonth = monthHidden?.value || currentMonthName;
            const selectedYear = yearInput?.value || currentYear;
            const selectedSection = sectionSelect?.value || '';
            const monthNumber = getBm4MonthNumber(selectedMonth);
            const currentMonthYear = currentDate.getFullYear() === Number(selectedYear) && currentDate.getMonth() + 1 === monthNumber;

            const inventoryForSection = state.inventory.filter(item => !selectedSection || item.section === selectedSection);
            // incorporaciones: sólo contar items con createdAt en el periodo
            const incorporacionMes = inventoryForSection.filter(item => {
                const createdAt = item.createdAt || '';
                if (!createdAt) return false;
                return isSameMonthYear(createdAt, selectedMonth, selectedYear);
            }).length;

            // desincorporaciones del mes (filtradas por sección si aplica)
            const desincorporacionMes = state.desincorporations.reduce((sum, item) => {
                if (!isSameMonthYear(item.date, selectedMonth, selectedYear)) return sum;
                if (selectedSection) {
                    const inv = state.inventory.find(invItem => invItem.order === item.order);
                    if (!inv || inv.section !== selectedSection) return sum;
                }
                return sum + (Number(item.quantity) || 0);
            }, 0);

            const bienesTotales = inventoryForSection.length;
            const valorTotal = inventoryForSection.reduce((sum, item) => sum + calculateBm1Total(item.quantity, item.value), 0);
            const movements = state.movements.filter(item => (!selectedSection || item.section === selectedSection) && isSameMonthYear(item.date, selectedMonth, selectedYear)).length;
            const desincorporados = state.desincorporations.reduce((sum, item) => {
                if (selectedSection) {
                    const inv = state.inventory.find(invItem => invItem.order === item.order);
                    if (!inv || inv.section !== selectedSection) return sum;
                }
                return sum + (Number(item.quantity) || 0);
            }, 0);

            // calcular mes/año anterior
            const getPreviousMonthYear = (monthName, yearStr) => {
                const monthNum = getBm4MonthNumber(monthName);
                let prev = monthNum - 1;
                let yr = Number(yearStr);
                if (prev < 1) { prev = 12; yr -= 1; }
                return { monthName: monthNames[prev - 1], year: String(yr) };
            };

            const prev = getPreviousMonthYear(selectedMonth, selectedYear);

            // existencia anterior: buscar reporte previo por sección, si no existe usar conteo de inventario
            let existenciaAnteriorValue = 0;
            if (selectedSection) {
                const prevReport = state.reports.find(r => r.month === prev.monthName && r.year === prev.year && r.section === selectedSection);
                existenciaAnteriorValue = prevReport ? Number(prevReport.bienesTotales) || 0 : inventoryForSection.length;
            } else {
                const prevReport = state.reports.find(r => r.month === prev.monthName && r.year === prev.year);
                existenciaAnteriorValue = prevReport ? Number(prevReport.bienesTotales) || 0 : inventoryForSection.length;
            }

            // desincorporacion mes pasado: sumar desincorporaciones del mes previo, filtrando por sección
            const desincorporacionMesPasado = state.desincorporations.reduce((sum, item) => {
                if (!isSameMonthYear(item.date, prev.monthName, prev.year)) return sum;
                if (selectedSection) {
                    const inv = state.inventory.find(invItem => invItem.order === item.order);
                    if (!inv || inv.section !== selectedSection) return sum;
                }
                return sum + (Number(item.quantity) || 0);
            }, 0);

            const setAutoFieldValue = (fieldName, value) => {
                const field = bm4Form.querySelector(`[name="${fieldName}"]`);
                if (field) {
                    field.value = Number.isFinite(Number(value)) ? String(value) : '0';
                }
            };

            setAutoFieldValue('year', selectedYear);
            setAutoFieldValue('incorporacionMes', incorporacionMes);
            setAutoFieldValue('desincorporacionMes', desincorporacionMes);
            setAutoFieldValue('existenciaAnterior', existenciaAnteriorValue);
            setAutoFieldValue('desincorporacionMesPasado', desincorporacionMesPasado);
            setAutoFieldValue('bienesTotales', bienesTotales);
            setAutoFieldValue('valorTotal', valorTotal);
            setAutoFieldValue('movements', movements);
            setAutoFieldValue('desincorporados', desincorporados);
        };

        // Attach listeners once to recalculate when user changes year/section inside modal
        if (bm4Form && !bm4Form.dataset.autoListenersAttached) {
            const yearEl = bm4Form.querySelector('[name="year"]');
            const sectionEl = bm4Form.querySelector('[name="section"]');
            const recalc = () => populateBm4AutoFields();
            if (yearEl) yearEl.addEventListener('input', recalc);
            if (sectionEl) sectionEl.addEventListener('change', recalc);
            bm4Form.dataset.autoListenersAttached = '1';
        }

        const openBm4Modal = () => {
            if (bm4Modal) {
                bm4Modal.classList.remove('hidden');
                bm4Modal.classList.add('flex');
            }
            if (bm4Form) {
                bm4Form.reset();
                populateBm4AutoFields();
            }
            if (bm4FormMessage) {
                bm4FormMessage.textContent = '';
                bm4FormMessage.className = 'mt-2 text-sm text-on-surface-variant';
            }
        };

        const dismissBm4Modal = () => {
            if (bm4Modal) {
                bm4Modal.classList.add('hidden');
                bm4Modal.classList.remove('flex');
            }
            if (bm4Form) {
                bm4Form.reset();
            }
            if (bm4FormMessage) {
                bm4FormMessage.textContent = '';
                bm4FormMessage.className = 'mt-2 text-sm text-on-surface-variant';
            }
        };

        const closeBm4Detail = () => {
            if (bm4DetailModal) {
                bm4DetailModal.classList.add('hidden');
                bm4DetailModal.classList.remove('flex');
            }
            bm4ActiveDetailId = null;
            if (bm4DetailContent) {
                bm4DetailContent.innerHTML = '';
            }
        };

        const openBm4Detail = (reportId) => {
            const report = state.reports.find(item => item.id === reportId);
            if (!report) {
                return;
            }
            bm4ActiveDetailId = reportId;
            if (bm4DetailTitle) {
                bm4DetailTitle.textContent = `${report.month} ${report.year} - ${report.section}`;
            }
            if (bm4DetailContent) {
                bm4DetailContent.innerHTML = `
                    <div class="grid gap-sm md:grid-cols-2">
                        <div class="rounded-lg border border-outline-variant p-sm"><p class="text-label-sm">Mes</p><p class="text-body-md text-on-surface">${escapeHtml(report.month)}</p></div>
                        <div class="rounded-lg border border-outline-variant p-sm"><p class="text-label-sm">Año</p><p class="text-body-md text-on-surface">${escapeHtml(report.year)}</p></div>
                        <div class="rounded-lg border border-outline-variant p-sm"><p class="text-label-sm">Sección</p><p class="text-body-md text-on-surface">${escapeHtml(report.section)}</p></div>
                                <div class="rounded-lg border border-outline-variant p-sm"><p class="text-label-sm">Existencia anterior</p><p class="text-body-md text-on-surface">${report.existenciaAnterior.toLocaleString('es-BO')}</p></div>
                        <div class="rounded-lg border border-outline-variant p-sm"><p class="text-label-sm">Incorporación del mes</p><p class="text-body-md text-on-surface">${report.incorporacionMes.toLocaleString('es-BO')}</p></div>
                        <div class="rounded-lg border border-outline-variant p-sm"><p class="text-label-sm">Desincorporación del mes</p><p class="text-body-md text-on-surface">${report.desincorporacionMes.toLocaleString('es-BO')}</p></div>
                        <div class="rounded-lg border border-outline-variant p-sm"><p class="text-label-sm">Desincorporación mes pasado</p><p class="text-body-md text-on-surface">${report.desincorporacionMesPasado.toLocaleString('es-BO')}</p></div>
                        <div class="rounded-lg border border-outline-variant p-sm"><p class="text-label-sm">Bienes totales</p><p class="text-body-md text-on-surface">${report.bienesTotales.toLocaleString('es-BO')}</p></div>
                        <div class="rounded-lg border border-outline-variant p-sm"><p class="text-label-sm">Valor total</p><p class="text-body-md text-on-surface">${formatCurrency(report.valorTotal)}</p></div>
                        <div class="rounded-lg border border-outline-variant p-sm"><p class="text-label-sm">Movimientos</p><p class="text-body-md text-on-surface">${report.movements.toLocaleString('es-BO')}</p></div>
                        <div class="rounded-lg border border-outline-variant p-sm"><p class="text-label-sm">Desincorporados</p><p class="text-body-md text-on-surface">${report.desincorporados.toLocaleString('es-BO')}</p></div>
                    </div>
                `;
            }
            if (bm4DetailModal) {
                bm4DetailModal.classList.remove('hidden');
                bm4DetailModal.classList.add('flex');
            }
        };

        if (addBm4) {
            addBm4.addEventListener('click', openBm4Modal);
        }
        if (exportBm4) {
            exportBm4.addEventListener('click', () => {
                const selectedMonth = window.__bm4SelectedMonth || 'Todos';
                const selectedYear = window.__bm4SelectedYear || 'Todos';
                const selectedSection = window.__bm4SelectedSection || 'Todos';
                const filteredReports = state.reports.filter((item) => {
                    const matchesMonth = selectedMonth === 'Todos' || item.month === selectedMonth;
                    const matchesYear = selectedYear === 'Todos' || item.year === selectedYear;
                    const matchesSection = selectedSection === 'Todos' || item.section === selectedSection;
                    return matchesMonth && matchesYear && matchesSection;
                });
                exportBm4Reports(filteredReports);
            });
        }
        if (closeBm4Modal) {
            closeBm4Modal.addEventListener('click', dismissBm4Modal);
        }
        if (cancelBm4Modal) {
            cancelBm4Modal.addEventListener('click', dismissBm4Modal);
        }
        if (applyBm4Filters) {
            applyBm4Filters.addEventListener('click', () => {
                const monthSelect = document.getElementById('bm4-filter-month');
                const yearSelect = document.getElementById('bm4-filter-year');
                const sectionSelect = document.getElementById('bm4-filter-section');
                window.__bm4SelectedMonth = monthSelect?.value || 'Todos';
                window.__bm4SelectedYear = yearSelect?.value || 'Todos';
                window.__bm4SelectedSection = sectionSelect?.value || 'Todos';
                renderBm4(state);
            });
        }
        if (bm4Modal) {
            bm4Modal.addEventListener('click', (event) => {
                if (event.target === bm4Modal) {
                    dismissBm4Modal();
                }
            });
        }
        if (bm4Form) {
            bm4Form.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(bm4Form);
                const month = formData.get('month').toString().trim();
                const year = formData.get('year').toString().trim();
                const section = formData.get('section').toString().trim();
                const existenciaAnterior = Number(formData.get('existenciaAnterior'));
                const incorporacionMes = Number(formData.get('incorporacionMes'));
                const desincorporacionMes = Number(formData.get('desincorporacionMes'));
                const desincorporacionMesPasado = Number(formData.get('desincorporacionMesPasado'));
                const bienesTotales = Number(formData.get('bienesTotales'));
                const valorTotal = Number(formData.get('valorTotal'));
                const movements = Number(formData.get('movements'));
                const desincorporados = Number(formData.get('desincorporados'));

                if (!month || !year || !section ||
                    !Number.isFinite(existenciaAnterior) || !Number.isFinite(incorporacionMes) ||
                    !Number.isFinite(desincorporacionMes) || !Number.isFinite(desincorporacionMesPasado) ||
                    !Number.isFinite(bienesTotales) || !Number.isFinite(valorTotal) ||
                    !Number.isFinite(movements) || !Number.isFinite(desincorporados)) {
                    if (bm4FormMessage) {
                        bm4FormMessage.textContent = 'Ingresa valores válidos para generar el reporte.';
                        bm4FormMessage.className = 'mt-2 text-sm text-error';
                    }
                    return;
                }

                state.reports.unshift({
                    id: Date.now(),
                    month,
                    year,
                    section,
                    existenciaAnterior,
                    incorporacionMes,
                    desincorporacionMes,
                    desincorporacionMesPasado,
                    bienesTotales,
                    valorTotal,
                    movements,
                    desincorporados
                });
                saveState(state);
                dismissBm4Modal();
                renderBm4(state);
            });
        }

        if (bm4DetailModal) {
            bm4DetailModal.addEventListener('click', (event) => {
                if (event.target === bm4DetailModal) {
                    closeBm4Detail();
                }
            });
        }
        if (bm4CloseDetail) {
            bm4CloseDetail.addEventListener('click', closeBm4Detail);
        }
        if (bm4DetailClose) {
            bm4DetailClose.addEventListener('click', closeBm4Detail);
        }
        if (bm4DetailDownload) {
            bm4DetailDownload.addEventListener('click', () => {
                const report = state.reports.find(item => item.id === bm4ActiveDetailId);
                if (!report) {
                    return;
                }
                exportBm4Reports([report]);
            });
        }

        const renderBm4PrintLayout = (report) => {
            if (!bm4PrintLayout || !report) {
                return;
            }
            bm4PrintLayout.innerHTML = `
                <div style="font-family: Arial, sans-serif; color: #000; padding: 1rem;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
                        <div style="width: 100px;"><img src="logo alcaldia.png" alt="Logo" style="max-width: 100%; height: auto;" /></div>
                        <div style="text-align: center; flex: 1; margin: 0 1rem; line-height: 1.1;">
                            <div style="font-size: 1.1rem; font-weight: 700;">FORMULARIO B.M. 4</div>
                            <div style="font-size: 0.95rem; font-weight: 600; margin-top: 0.25rem;">RESUMEN DE LA CUENTA DE BIENES MUEBLES</div>
                        </div>
                        <div style="width: 100px;"></div>
                    </div>
                    <div style="margin-bottom: 1rem; font-size: 0.9rem;">
                        <div style="margin-bottom: 0.5rem;"><strong>UNIDAD DE TRABAJO O DEPENDENCIA:</strong> ${escapeHtml(report.section)}</div>
                        <div style="margin-bottom: 0.5rem;"><strong>Corresponde al Mes y Año:</strong> ${escapeHtml(report.month)} ${escapeHtml(report.year)}</div>
                    </div>
                    <div style="border-top: 1px solid #000; padding-top: 0.75rem; font-size: 0.95rem; line-height: 1.5;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;"><span><strong>EXISTENCIA ANTERIOR:</strong></span><span>${report.existenciaAnterior.toLocaleString('es-BO')}</span></div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;"><span><strong>INCORPORACIÓN DEL MES:</strong></span><span>${report.incorporacionMes.toLocaleString('es-BO')}</span></div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;"><span><strong>DESINCORPORACIÓN POR TODOS CONCEPTOS:</strong></span><span>${report.desincorporacionMes.toLocaleString('es-BO')}</span></div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;"><span><strong>DESINCORPORACIÓN MES PASADO:</strong></span><span>${report.desincorporacionMesPasado.toLocaleString('es-BO')}</span></div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;"><span><strong>EXISTENCIA FINAL:</strong></span><span>${report.bienesTotales.toLocaleString('es-BO')}</span></div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;"><span><strong>TOTALES IGUALES:</strong></span><span>${report.bienesTotales.toLocaleString('es-BO')}</span></div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;"><span><strong>VALOR TOTAL Bs:</strong></span><span>${formatCurrency(report.valorTotal)}</span></div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;"><span><strong>MOVIMIENTOS:</strong></span><span>${report.movements.toLocaleString('es-BO')}</span></div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;"><span><strong>DESINCORPORADOS:</strong></span><span>${report.desincorporados.toLocaleString('es-BO')}</span></div>
                    </div>
                </div>
            `;
        };

        document.addEventListener('click', (event) => {
            const viewButton = event.target.closest('[data-bm4-view]');
            if (viewButton) {
                const reportId = Number(viewButton.getAttribute('data-bm4-view'));
                openBm4Detail(reportId);
            }
            const downloadButton = event.target.closest('[data-bm4-download]');
            if (downloadButton) {
                const reportId = Number(downloadButton.getAttribute('data-bm4-download'));
                const report = state.reports.find(item => item.id === reportId);
                if (report) {
                    exportBm4Reports([report]);
                }
            }
            const printButton = event.target.closest('[data-bm4-print]');
            if (printButton) {
                const reportId = Number(printButton.getAttribute('data-bm4-print'));
                const report = state.reports.find(item => item.id === reportId);
                if (report) {
                    renderBm4PrintLayout(report);
                    window.print();
                }
            }
            const deleteButton = event.target.closest('[data-bm4-delete]');
            if (deleteButton) {
                const reportId = Number(deleteButton.getAttribute('data-bm4-delete'));
                const report = state.reports.find(item => item.id === reportId);
                if (!report) {
                    return;
                }
                if (window.confirm(`¿Deseas eliminar el reporte ${report.month} ${report.year} - ${report.section}?`)) {
                    state.reports = state.reports.filter(r => r.id !== reportId);
                    saveState(state);
                    renderBm4(state);
                }
            }
        });
    }

    function renderDashboard(state) {
        const totalActivos = document.getElementById('summary-total-activos');
        const totalMovimientos = document.getElementById('summary-movimientos');
        const desincorporaciones = document.getElementById('summary-desincorporaciones');
        const activityList = document.getElementById('dashboard-activity-list');

        if (totalActivos) {
            totalActivos.textContent = state.inventory.length.toLocaleString('es-BO');
        }
        if (totalMovimientos) {
            totalMovimientos.textContent = state.movements.length.toLocaleString('es-BO');
        }
        if (desincorporaciones) {
            const pendientes = state.desincorporations.filter(item => item.state === 'Pendiente').length;
            desincorporaciones.textContent = pendientes.toLocaleString('es-BO');
        }
        if (activityList) {
            const recentItems = [
                ...state.inventory.slice(0, 2).map(item => ({
                    title: `Nuevo bien registrado: ${item.description}`,
                    meta: `Orden ${item.order}`,
                    icon: 'inventory_2'
                })),
                ...state.movements.slice(0, 2).map(item => ({
                    title: `Movimiento: ${item.concept}`,
                    meta: `${item.state} · ${item.section}`,
                    icon: 'swap_horiz'
                })),
                ...state.desincorporations.slice(0, 1).map(item => ({
                    title: `Desincorporación pendiente: ${item.description}`,
                    meta: `Motivo: ${item.reason}`,
                    icon: 'delete_forever'
                }))
            ].slice(0, 5);

            activityList.innerHTML = recentItems.map(item => `
                <div class="flex items-start gap-sm rounded-lg border border-outline-variant/80 px-md py-sm bg-surface-container-low/70">
                    <span class="material-symbols-outlined text-primary mt-0.5">${escapeHtml(item.icon)}</span>
                    <div>
                        <p class="text-body-sm font-medium text-on-surface">${escapeHtml(item.title)}</p>
                        <p class="text-label-sm text-on-surface-variant">${escapeHtml(item.meta)}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    function renderBm1(state) {
        const countLabel = document.getElementById('bm1-record-count');
        const tableBody = document.getElementById('bm1-table-body');
        const summaryTotal = document.getElementById('bm1-summary-total');
        const summaryMonth = document.getElementById('bm1-summary-month');
        const summarySections = document.getElementById('bm1-summary-sections');
        const summaryValue = document.getElementById('bm1-summary-value');
        const filterButtons = document.querySelectorAll('[data-bm1-filter]');
        const searchInput = document.getElementById('bm1-search');
        const pageButtons = document.getElementById('bm1-page-buttons');
        const prevButton = document.getElementById('bm1-page-prev');
        const nextButton = document.getElementById('bm1-page-next');
        const masterCheckbox = document.getElementById('bm1-master-checkbox');
        const bulkDeleteButton = document.getElementById('bm1-bulk-delete');
        const selectedSection = window.__bm1SelectedSection || 'all';
        const searchQuery = window.__bm1SearchQuery || '';
        const pageSize = 5;
        const normalizedQuery = String(searchQuery).trim().toLowerCase();

        if (searchInput) {
            searchInput.value = searchQuery;
            searchInput.oninput = () => {
                window.__bm1SearchQuery = searchInput.value;
                window.__bm1CurrentPage = 1;
                renderBm1(state);
            };
        }

        const filtered = state.inventory.filter(item => {
            const sectionMatch = selectedSection === 'all' || item.section === selectedSection;
            if (!sectionMatch) {
                return false;
            }
            if (!normalizedQuery) {
                return true;
            }
            const searchableText = [item.group, item.subgroup, item.section, item.order, item.description]
                .filter(Boolean)
                .map(value => String(value).toLowerCase())
                .join(' ');
            return searchableText.includes(normalizedQuery);
        });
        const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
        const currentPage = Math.min(Math.max(Number(window.__bm1CurrentPage || 1), 1), totalPages);
        window.__bm1CurrentPage = currentPage;
        const startIndex = (currentPage - 1) * pageSize;
        const pageItems = filtered.slice(startIndex, startIndex + pageSize);
        const selectedIds = new Set(window.__bm1SelectedIds || []);

        if (countLabel) {
            countLabel.textContent = `${filtered.length} registros`;
        }
        if (summaryTotal) {
            summaryTotal.textContent = filtered.length.toLocaleString('es-BO');
        }
        if (summaryMonth) {
            summaryMonth.textContent = filtered.length.toLocaleString('es-BO');
        }
        if (summarySections) {
            const uniqueSections = new Set(filtered.map(item => item.section));
            summarySections.textContent = uniqueSections.size.toString();
        }
        if (summaryValue) {
            const totalValue = filtered.reduce((sum, item) => sum + calculateBm1Total(item.quantity, item.value), 0);
            summaryValue.textContent = formatCurrency(totalValue);
        }
        const paginationSummary = document.getElementById('bm1-pagination-summary');
        if (paginationSummary) {
            const visibleCount = filtered.length ? Math.min(filtered.length - startIndex, pageSize) : 0;
            paginationSummary.innerHTML = `Mostrando <span class="font-bold">${visibleCount}</span> de <span class="font-bold">${filtered.length}</span> registros`;
        }
        if (tableBody) {
            tableBody.innerHTML = pageItems.map(item => `
                <tr class="hover:bg-surface-container transition-colors group">
                    <td class="px-lg py-md"><input data-bm1-row-checkbox="${item.id}" class="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" ${selectedIds.has(item.id) ? 'checked' : ''}/></td>
                    <td class="px-lg py-md"><span class="text-body-sm">${escapeHtml(item.group)}</span></td>
                    <td class="px-lg py-md"><span class="text-body-sm">${escapeHtml(item.subgroup)}</span></td>
                    <td class="px-lg py-md"><span class="text-body-sm">${escapeHtml(item.section)}</span></td>
                    <td class="px-lg py-md"><span class="text-body-sm">${escapeHtml(item.quantity)}</span></td>
                    <td class="px-lg py-md"><span class="text-body-sm">${escapeHtml(item.order)}</span></td>
                    <td class="px-lg py-md"><span class="text-body-sm">${escapeHtml(item.description)}</span></td>
                    <td class="px-lg py-md"><span class="text-body-sm">${formatCurrency(item.value)}</span></td>
                    <td class="px-lg py-md"><span class="text-body-sm">${formatCurrency(calculateBm1Total(item.quantity, item.value))}</span></td>
                    <td class="px-lg py-md text-right">
                        <div class="flex justify-end gap-2">
                            <button data-edit-item="${item.id}" class="p-2 rounded-md hover:bg-primary-container/10 text-primary" title="Editar">
                                <span class="material-symbols-outlined text-base">edit_square</span>
                            </button>
                            <button data-delete-item="${item.id}" ${state.auth.role !== 'admin' ? 'disabled aria-disabled="true"' : ''} class="p-2 rounded-md ${state.auth.role !== 'admin' ? 'opacity-40 cursor-not-allowed' : 'hover:bg-error-container/20'} text-error" title="Eliminar">
                                <span class="material-symbols-outlined text-base">delete</span>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        if (pageButtons) {
            pageButtons.innerHTML = '';
            for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = pageNumber.toString();
                button.className = pageNumber === currentPage
                    ? 'min-w-8 rounded-lg bg-primary px-sm py-1 text-on-primary'
                    : 'min-w-8 rounded-lg bg-surface-container-high px-sm py-1 text-on-surface-variant';
                button.addEventListener('click', () => {
                    window.__bm1CurrentPage = pageNumber;
                    renderBm1(state);
                });
                pageButtons.appendChild(button);
            }
        }

        if (prevButton) {
            prevButton.disabled = currentPage <= 1;
            prevButton.className = currentPage <= 1
                ? 'p-2 rounded-lg bg-surface-container-high text-on-surface-variant transition-all opacity-50 cursor-not-allowed'
                : 'p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-all';
            prevButton.onclick = () => {
                if (currentPage > 1) {
                    window.__bm1CurrentPage = currentPage - 1;
                    renderBm1(state);
                }
            };
        }

        if (nextButton) {
            nextButton.disabled = currentPage >= totalPages;
            nextButton.className = currentPage >= totalPages
                ? 'p-2 rounded-lg bg-surface-container-high text-on-surface-variant transition-all opacity-50 cursor-not-allowed'
                : 'p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-all';
            nextButton.onclick = () => {
                if (currentPage < totalPages) {
                    window.__bm1CurrentPage = currentPage + 1;
                    renderBm1(state);
                }
            };
        }

        document.querySelectorAll('[data-edit-item]').forEach(button => {
            button.addEventListener('click', () => {
                openBm1Modal(state, Number(button.getAttribute('data-edit-item')));
            });
        });

        document.querySelectorAll('[data-delete-item]').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = Number(button.getAttribute('data-delete-item'));
                const item = state.inventory.find(entry => entry.id === itemId);
                if (!item) {
                    return;
                }

                if (window.confirm(`¿Deseas eliminar el bien "${item.description}"?`)) {
                    state.inventory = state.inventory.filter(entry => entry.id !== itemId);
                    saveState(state);
                    renderDashboard(state);
                    renderBm1(state);
                }
            });
        });

        const rowCheckboxes = document.querySelectorAll('[data-bm1-row-checkbox]');
        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const itemId = Number(checkbox.getAttribute('data-bm1-row-checkbox'));
                const selected = new Set(window.__bm1SelectedIds || []);
                if (checkbox.checked) {
                    selected.add(itemId);
                } else {
                    selected.delete(itemId);
                }
                window.__bm1SelectedIds = Array.from(selected);
                if (masterCheckbox) {
                    masterCheckbox.checked = rowCheckboxes.length > 0 && Array.from(rowCheckboxes).every(box => box.checked);
                }
                if (bulkDeleteButton) {
                    bulkDeleteButton.classList.toggle('hidden', selected.size === 0);
                }
            });
        });

        if (bulkDeleteButton) {
            if (state.auth.role !== 'admin') {
                bulkDeleteButton.disabled = true;
                bulkDeleteButton.classList.add('opacity-40', 'cursor-not-allowed');
            } else {
                bulkDeleteButton.disabled = false;
                bulkDeleteButton.classList.remove('opacity-40', 'cursor-not-allowed');
            }

            bulkDeleteButton.onclick = () => {
                if (state.auth.role !== 'admin') {
                    return;
                }
                const selectedIds = Array.from(new Set(window.__bm1SelectedIds || []));
                if (!selectedIds.length) {
                    return;
                }

                const selectedItems = state.inventory.filter(item => selectedIds.includes(item.id));
                if (!selectedItems.length) {
                    return;
                }

                const itemLabel = selectedItems.length === 1 ? 'el bien seleccionado' : `${selectedItems.length} bienes seleccionados`;
                if (!window.confirm(`¿Deseas eliminar ${itemLabel}?`)) {
                    return;
                }

                state.inventory = state.inventory.filter(item => !selectedIds.includes(item.id));
                saveState(state);
                window.__bm1SelectedIds = [];
                renderDashboard(state);
                renderBm1(state);
            };
            bulkDeleteButton.classList.toggle('hidden', (window.__bm1SelectedIds || []).length === 0);
        }

        if (masterCheckbox) {
            masterCheckbox.checked = rowCheckboxes.length > 0 && Array.from(rowCheckboxes).every(checkbox => checkbox.checked);
            masterCheckbox.onchange = () => {
                const selected = new Set(window.__bm1SelectedIds || []);
                rowCheckboxes.forEach(checkbox => {
                    const itemId = Number(checkbox.getAttribute('data-bm1-row-checkbox'));
                    checkbox.checked = masterCheckbox.checked;
                    if (masterCheckbox.checked) {
                        selected.add(itemId);
                    } else {
                        selected.delete(itemId);
                    }
                });
                window.__bm1SelectedIds = Array.from(selected);
                if (bulkDeleteButton) {
                    bulkDeleteButton.classList.toggle('hidden', selected.size === 0);
                }
            };
        }

        filterButtons.forEach(button => {
            const isActive = button.dataset.bm1Filter === selectedSection;
            button.className = isActive
                ? 'px-md py-2 rounded-full bg-primary-container text-on-primary-container font-semibold text-label-sm'
                : 'px-md py-2 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm';
            button.onclick = () => {
                window.__bm1SelectedSection = button.dataset.bm1Filter || 'all';
                window.__bm1CurrentPage = 1;
                window.__bm1SelectedIds = [];
                renderBm1(state);
            };
        });
    }

    function renderBm2(state) {
        const countLabel = document.getElementById('bm2-record-count');
        const tableBody = document.getElementById('bm2-table-body');
        const sectionButtons = document.querySelectorAll('[id^="bm2-section-filter"]');
        const dateInput = document.getElementById('bm2-date-filter');
        const paginationSummary = document.getElementById('bm2-pagination-summary');
        const prevButton = document.getElementById('bm2-page-prev');
        const nextButton = document.getElementById('bm2-page-next');
        const pageButtons = document.getElementById('bm2-page-buttons');
        const detailModal = document.getElementById('bm2-detail-modal');
        const detailContent = document.getElementById('bm2-detail-content');
        const closeDetailModal = document.getElementById('bm2-close-detail');
        const selectedSection = window.__bm2SelectedSection || 'all';
        const selectedDate = window.__bm2SelectedDate || '';
        const pageSize = 5;

        const openDetailModal = (movement) => {
            if (!detailModal || !detailContent) {
                return;
            }

            if (!movement) {
                detailContent.innerHTML = '<p class="text-error">No se pudo encontrar la información del movimiento.</p>';
            } else {
                detailContent.innerHTML = `
                    <div class="rounded-lg border border-outline-variant bg-surface-container-low p-md space-y-2">
                        <p class="text-label-sm font-semibold text-primary">Solicitud #${escapeHtml(movement.id)}</p>
                        <p><span class="font-semibold text-on-surface">Nro. de orden:</span> ${escapeHtml(movement.order)}</p>
                        <p><span class="font-semibold text-on-surface">Concepto:</span> ${escapeHtml(movement.concept)}</p>
                        <p><span class="font-semibold text-on-surface">Fecha:</span> ${escapeHtml(movement.date)}</p>
                        <p><span class="font-semibold text-on-surface">Estado:</span> ${escapeHtml(movement.state)}</p>
                        <p><span class="font-semibold text-on-surface">Sección:</span> ${escapeHtml(movement.section)}</p>
                    </div>
                `;
            }

            detailModal.classList.remove('hidden');
            detailModal.classList.add('flex');
        };

        const closeDetail = () => {
            if (detailModal) {
                detailModal.classList.add('hidden');
                detailModal.classList.remove('flex');
            }
        };

        if (closeDetailModal) {
            closeDetailModal.onclick = closeDetail;
        }
        if (detailModal) {
            detailModal.addEventListener('click', (event) => {
                if (event.target === detailModal) {
                    closeDetail();
                }
            });
        }

        const filtered = state.movements.filter(item => {
            const matchesSection = selectedSection === 'all' || item.section === selectedSection;
            const matchesDate = !selectedDate || item.date === selectedDate;
            return matchesSection && matchesDate;
        });

        const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
        const currentPage = Math.min(Math.max(Number(window.__bm2CurrentPage || 1), 1), totalPages);
        window.__bm2CurrentPage = currentPage;
        const startIndex = (currentPage - 1) * pageSize;
        const pageItems = filtered.slice(startIndex, startIndex + pageSize);

        if (countLabel) {
            countLabel.textContent = `${filtered.length} movimientos`;
        }
        if (paginationSummary) {
            const visibleCount = filtered.length ? Math.min(filtered.length - startIndex, pageSize) : 0;
            paginationSummary.textContent = `Mostrando ${visibleCount} de ${filtered.length} movimientos`;
        }
        if (tableBody) {
            tableBody.innerHTML = pageItems.map(item => `
                <tr class="hover:bg-surface-container-lowest transition-colors group">
                    <td class="px-lg py-md text-body-sm font-bold">${escapeHtml(item.order)}</td>
                    <td class="px-lg py-md"><div class="flex items-center gap-xs"><span class="material-symbols-outlined text-secondary text-base">move_down</span><span class="text-body-sm">${escapeHtml(item.concept)}</span></div></td>
                    <td class="px-lg py-md text-body-sm">${escapeHtml(item.date)}</td>
                    <td class="px-lg py-md">
                        ${state.auth.role === 'admin'
                            ? `<select data-bm2-state-select="${item.id}" class="w-full rounded-lg border border-outline-variant bg-surface p-2 text-sm text-on-surface">
                                    <option value="En Revisión" ${item.state === 'En Revisión' ? 'selected' : ''}>En Revisión</option>
                                    <option value="Aprobado" ${item.state === 'Aprobado' ? 'selected' : ''}>Aprobado</option>
                                </select>`
                            : `<span class="text-body-sm">${escapeHtml(item.state)}</span>`
                        }
                    </td>
                    <td class="px-lg py-md text-right"><div class="flex justify-end gap-sm opacity-60 group-hover:opacity-100 transition-opacity">
                        <button type="button" data-detail-item="${item.id}" class="p-xs hover:bg-surface-container rounded transition-colors" title="Ver Detalle"><span class="material-symbols-outlined text-md">visibility</span></button>
                        <button type="button" data-delete-item="${item.id}" ${state.auth.role !== 'admin' ? 'disabled aria-disabled="true"' : ''} class="p-xs rounded transition-colors text-error ${state.auth.role !== 'admin' ? 'opacity-40 cursor-not-allowed' : 'hover:bg-error-container/20'}" title="Eliminar solicitud"><span class="material-symbols-outlined text-md">delete</span></button>
                    </div></td>
                </tr>
            `).join('');
        }

        document.querySelectorAll('[data-detail-item]').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = Number(button.getAttribute('data-detail-item'));
                const movement = state.movements.find(entry => entry.id === itemId);
                openDetailModal(movement);
            });
        });

        document.querySelectorAll('[data-delete-item]').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = Number(button.getAttribute('data-delete-item'));
                const movement = state.movements.find(entry => entry.id === itemId);
                if (!movement) {
                    return;
                }

                if (window.confirm(`¿Deseas eliminar la solicitud ${movement.order}?`)) {
                    state.movements = state.movements.filter(entry => entry.id !== itemId);
                    saveState(state);
                    renderDashboard(state);
                    renderBm2(state);
                }
            });
        });

        document.querySelectorAll('[data-bm2-state-select]').forEach(select => {
            select.addEventListener('change', () => {
                const itemId = Number(select.getAttribute('data-bm2-state-select'));
                const movement = state.movements.find(entry => entry.id === itemId);
                if (!movement) {
                    return;
                }

                movement.state = select.value;
                saveState(state);
                renderDashboard(state);
                renderBm2(state);
            });
        });

        if (pageButtons) {
            pageButtons.innerHTML = '';
            for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = pageNumber.toString();
                button.className = pageNumber === currentPage
                    ? 'min-w-8 rounded-lg bg-primary px-sm py-1 text-on-primary'
                    : 'min-w-8 rounded-lg bg-surface-container-high px-sm py-1 text-on-surface-variant';
                button.addEventListener('click', () => {
                    window.__bm2CurrentPage = pageNumber;
                    renderBm2(state);
                });
                pageButtons.appendChild(button);
            }
        }

        if (prevButton) {
            prevButton.disabled = currentPage <= 1;
            prevButton.className = currentPage <= 1
                ? 'p-xs rounded text-outline opacity-50 cursor-not-allowed'
                : 'p-xs rounded hover:bg-surface-container text-outline';
            prevButton.onclick = () => {
                if (currentPage > 1) {
                    window.__bm2CurrentPage = currentPage - 1;
                    renderBm2(state);
                }
            };
        }

        if (nextButton) {
            nextButton.disabled = currentPage >= totalPages;
            nextButton.className = currentPage >= totalPages
                ? 'p-xs rounded text-outline opacity-50 cursor-not-allowed'
                : 'p-xs rounded hover:bg-surface-container text-outline';
            nextButton.onclick = () => {
                if (currentPage < totalPages) {
                    window.__bm2CurrentPage = currentPage + 1;
                    renderBm2(state);
                }
            };
        }

        sectionButtons.forEach(button => {
            const isActive = button.dataset.section === selectedSection;
            button.className = isActive
                ? 'px-md py-xs rounded-full bg-primary-container text-on-primary-container font-bold text-label-sm border border-primary/20'
                : 'px-md py-xs rounded-full bg-surface-container-high text-on-surface-variant font-medium text-label-sm hover:bg-secondary-container/30 transition-colors';
        });

        if (dateInput) {
            dateInput.value = selectedDate;
            dateInput.onchange = () => {
                window.__bm2SelectedDate = dateInput.value;
                window.__bm2CurrentPage = 1;
                renderBm2(state);
            };
        }

        sectionButtons.forEach(button => {
            button.onclick = () => {
                window.__bm2SelectedSection = button.dataset.section || 'all';
                window.__bm2CurrentPage = 1;
                renderBm2(state);
            };
        });
    }

    function renderBm3(state) {
        const countLabel = document.getElementById('bm3-record-count');
        const tableBody = document.getElementById('bm3-table-body');
        const paginationSummary = document.getElementById('bm3-pagination-summary');
        const prevButton = document.getElementById('bm3-page-prev');
        const nextButton = document.getElementById('bm3-page-next');
        const summaryPending = document.getElementById('bm3-summary-pending');
        const summaryPendingBadge = document.getElementById('bm3-summary-pending-badge');
        const summaryMonth = document.getElementById('bm3-summary-month');
        const summaryValue = document.getElementById('bm3-summary-value');
        const chart1 = document.getElementById('bm3-chart-bar-1-fill');
        const chart2 = document.getElementById('bm3-chart-bar-2-fill');
        const chart3 = document.getElementById('bm3-chart-bar-3-fill');
        const chart4 = document.getElementById('bm3-chart-bar-4-fill');
        const pageSize = 5;
        const selectedPage = Math.max(Number(window.__bm3CurrentPage || 1), 1);
        window.__bm3CurrentPage = selectedPage;

        const filtered = state.desincorporations;
        const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
        const currentPage = Math.min(selectedPage, totalPages);
        window.__bm3CurrentPage = currentPage;
        const startIndex = (currentPage - 1) * pageSize;
        const pageItems = filtered.slice(startIndex, startIndex + pageSize);

        if (countLabel) {
            countLabel.textContent = `${filtered.length} solicitudes`;
        }
        if (summaryPending) {
            const pendingCount = filtered.filter(item => item.state === 'Pendiente').length;
            summaryPending.textContent = pendingCount.toLocaleString('es-BO');
        }
        if (summaryPendingBadge) {
            const pendingCount = filtered.filter(item => item.state === 'Pendiente').length;
            summaryPendingBadge.textContent = pendingCount ? `+${pendingCount} pendiente${pendingCount > 1 ? 's' : ''}` : 'Sin pendientes';
        }
        if (summaryMonth) {
            summaryMonth.textContent = filtered.length.toLocaleString('es-BO');
        }
        if (summaryValue) {
            const totalValue = filtered.reduce((sum, item) => {
                const inventoryItem = state.inventory.find(inv => inv.order === item.order);
                const unitValue = inventoryItem ? Number(inventoryItem.value) : 0;
                const quantity = Number(item.quantity) || 0;
                return sum + (unitValue * quantity);
            }, 0);
            summaryValue.textContent = formatCurrency(totalValue);
        }
        if (tableBody) {
            tableBody.innerHTML = pageItems.map(item => `
                <tr class="border-b border-outline-variant hover:bg-surface-container transition-colors">
                    <td class="px-md py-sm"><input class="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox"/></td>
                    <td class="px-md py-sm">${escapeHtml(item.order)}</td>
                    <td class="px-md py-sm">${escapeHtml(item.quantity)}</td>
                    <td class="px-md py-sm">${escapeHtml(item.reason)}</td>
                    <td class="px-md py-sm">${escapeHtml(item.date)}</td>
                    <td class="px-md py-sm">
                        <select data-bm3-state-select="${item.id}" class="w-full rounded-lg border border-outline-variant bg-surface p-2 text-sm text-on-surface">
                            <option value="Pendiente" ${item.state === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                            <option value="Completado" ${item.state === 'Completado' || item.state === 'Aprobado' ? 'selected' : ''}>Completado</option>
                        </select>
                    </td>
                    <td class="px-md py-sm text-right">
                        <div class="flex justify-end gap-sm">
                            <button type="button" data-bm3-view="${item.id}" class="p-2 rounded hover:bg-surface-container-high text-primary" title="Ver detalle"><span class="material-symbols-outlined text-base">visibility</span></button>
                            <button type="button" data-bm3-delete="${item.id}" ${state.auth.role !== 'admin' ? 'disabled aria-disabled="true"' : ''} class="p-2 rounded ${state.auth.role !== 'admin' ? 'opacity-40 cursor-not-allowed' : 'hover:bg-error-container/20'} text-error" title="Eliminar"><span class="material-symbols-outlined text-base">delete</span></button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
        if (paginationSummary) {
            const visibleCount = filtered.length ? Math.min(filtered.length - startIndex, pageSize) : 0;
            paginationSummary.textContent = `Mostrando ${visibleCount} de ${filtered.length} registros`;
        }
        if (prevButton) {
            prevButton.disabled = currentPage <= 1;
            prevButton.className = currentPage <= 1
                ? 'p-2 border border-outline-variant rounded-lg opacity-50 cursor-not-allowed'
                : 'p-2 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors';
            prevButton.onclick = () => {
                if (currentPage > 1) {
                    window.__bm3CurrentPage = currentPage - 1;
                    renderBm3(state);
                }
            };
        }
        if (nextButton) {
            nextButton.disabled = currentPage >= totalPages;
            nextButton.className = currentPage >= totalPages
                ? 'p-2 border border-outline-variant rounded-lg opacity-50 cursor-not-allowed'
                : 'p-2 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors';
            nextButton.onclick = () => {
                if (currentPage < totalPages) {
                    window.__bm3CurrentPage = currentPage + 1;
                    renderBm3(state);
                }
            };
        }

        document.querySelectorAll('[data-bm3-view]').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = Number(button.getAttribute('data-bm3-view'));
                const item = state.desincorporations.find(entry => entry.id === itemId);
                if (item) {
                    window.alert(`Detalle de solicitud\n\nNro. de orden: ${item.order}\nMotivo: ${item.reason}\nFecha: ${item.date}\nEstado: ${item.state}`);
                }
            });
        });

        document.querySelectorAll('[data-bm3-delete]').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = Number(button.getAttribute('data-bm3-delete'));
                const item = state.desincorporations.find(entry => entry.id === itemId);
                if (!item) {
                    return;
                }
                if (window.confirm(`¿Deseas eliminar la solicitud ${item.order}?`)) {
                    state.desincorporations = state.desincorporations.filter(entry => entry.id !== itemId);
                    saveState(state);
                    renderDashboard(state);
                    renderBm3(state);
                }
            });
        });

        document.querySelectorAll('[data-bm3-state-select]').forEach(select => {
            select.addEventListener('change', () => {
                const itemId = Number(select.getAttribute('data-bm3-state-select'));
                const item = state.desincorporations.find(entry => entry.id === itemId);
                if (!item) {
                    return;
                }
                item.state = select.value;
                saveState(state);
                renderDashboard(state);
                renderBm3(state);
            });
        });

        const reasons = state.desincorporations.reduce((acc, item) => {
            acc[item.reason] = (acc[item.reason] || 0) + 1;
            return acc;
        }, {});
        const total = Object.values(reasons).reduce((sum, value) => sum + value, 0) || 1;
        const heights = {
            Obsolescencia: reasons.Obsolescencia ? Math.round((reasons.Obsolescencia / total) * 100) : 0,
            Daño: reasons.Daño ? Math.round((reasons.Daño / total) * 100) : 0,
            Robo: reasons.Robo ? Math.round((reasons.Robo / total) * 100) : 0,
            Otros: reasons.Otros ? Math.round((reasons.Otros / total) * 100) : 0
        };

        if (chart1) chart1.style.height = `${Math.max(heights.Obsolescencia, 8)}%`;
        if (chart2) chart2.style.height = `${Math.max(heights.Daño, 8)}%`;
        if (chart3) chart3.style.height = `${Math.max(heights.Robo, 8)}%`;
        if (chart4) chart4.style.height = `${Math.max(heights.Otros, 8)}%`;
    }

    function exportBm4Reports(reports) {
        if (!reports.length) {
            window.alert('No hay reportes para exportar.');
            return;
        }

        const rows = reports.map(item => [
            item.month,
            item.year,
            item.section,
            item.existenciaAnterior,
            item.incorporacionMes,
            item.desincorporacionMes,
            item.desincorporacionMesPasado,
            item.bienesTotales,
            item.valorTotal,
            item.movements,
            item.desincorporados
        ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(','));

        const csvContent = [
            'Mes,Año,Sección/Unidad,Existencia anterior,Incorporación del mes,Desincorporación del mes,Desincorporación mes pasado,Bienes totales,Valor total,Movimientos,Desincorporados',
            ...rows
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reportes-bm4-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function renderBm4(state) {
        const countLabel = document.getElementById('bm4-record-count');
        const metrics = document.querySelectorAll('[data-report-metric]');
        const tableBody = document.getElementById('bm4-table-body');
        const tableSummary = document.getElementById('bm4-table-summary');
        const filterMonth = document.getElementById('bm4-filter-month');
        const filterYear = document.getElementById('bm4-filter-year');
        const filterSection = document.getElementById('bm4-filter-section');

        const selectedMonth = window.__bm4SelectedMonth || 'Todos';
        const selectedYear = window.__bm4SelectedYear || 'Todos';
        const selectedSection = window.__bm4SelectedSection || 'Todos';

        const filteredReports = state.reports.filter((item) => {
            const matchesMonth = selectedMonth === 'Todos' || item.month === selectedMonth;
            const matchesYear = selectedYear === 'Todos' || item.year === selectedYear;
            const matchesSection = selectedSection === 'Todos' || item.section === selectedSection;
            return matchesMonth && matchesYear && matchesSection;
        });

        if (countLabel) {
            countLabel.textContent = `${filteredReports.length} reportes`;
        }
        if (tableSummary) {
            const label = filteredReports.length ? `Mostrando ${filteredReports.length} reportes` : 'No hay reportes para los filtros seleccionados';
            tableSummary.innerHTML = `<p>${label}</p>`;
        }

        if (tableBody) {
            if (!filteredReports.length) {
                tableBody.innerHTML = '<tr><td class="px-lg py-md text-sm text-on-surface-variant" colspan="4">No hay reportes para los filtros seleccionados.</td></tr>';
            } else {
                tableBody.innerHTML = filteredReports.map((item) => `
                    <tr class="hover:bg-surface-container transition-colors group">
                        <td class="px-lg py-md">
                            <div class="flex items-center gap-md">
                                <span class="material-symbols-outlined text-primary" data-icon="description">description</span>
                                <div>
                                    <p class="text-body-md font-semibold text-on-surface">${escapeHtml(item.month)} ${escapeHtml(item.year)} - ${escapeHtml(item.section)}</p>
                                    <p class="text-label-sm font-label-sm text-on-surface-variant">Sección: ${escapeHtml(item.section)}</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-lg py-md text-body-sm text-on-surface-variant">${escapeHtml(item.year)}</td>
                        <td class="px-lg py-md text-body-sm text-on-surface">${escapeHtml(item.month)}</td>
                        <td class="px-lg py-md text-right">
                            <div class="flex justify-end gap-sm">
                                <button class="p-xs hover:bg-primary-container/10 rounded-md text-primary transition-all" title="Ver" data-bm4-view="${item.id}">
                                    <span class="material-symbols-outlined" data-icon="visibility">visibility</span>
                                </button>
                                <button class="p-xs hover:bg-primary-container/10 rounded-md text-primary transition-all" title="Imprimir" data-bm4-print="${item.id}">
                                    <span class="material-symbols-outlined" data-icon="print">print</span>
                                </button>
                                <button class="p-xs hover:bg-primary-container/10 rounded-md text-primary transition-all" title="Descargar" data-bm4-download="${item.id}">
                                    <span class="material-symbols-outlined" data-icon="download">download</span>
                                </button>
                                <button class="p-xs rounded-md text-error transition-all ${state.auth.role !== 'admin' ? 'opacity-40 cursor-not-allowed' : 'hover:bg-error-container/20'}" title="Eliminar" data-bm4-delete="${item.id}" ${state.auth.role !== 'admin' ? 'disabled aria-disabled="true"' : ''}>
                                    <span class="material-symbols-outlined" data-icon="delete">delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            }
        }

        if (metrics.length) {
            const inventoryMetric = document.querySelector('[data-report-metric="inventory"]');
            const movementMetric = document.querySelector('[data-report-metric="movements"]');
            const desincorporationsMetric = document.querySelector('[data-report-metric="desincorporations"]');

            if (inventoryMetric) {
                inventoryMetric.textContent = state.inventory.length.toLocaleString('es-BO');
            }
            if (movementMetric) {
                movementMetric.textContent = state.movements.length.toLocaleString('es-BO');
            }
            if (desincorporationsMetric) {
                const completedCount = state.desincorporations.length;
                desincorporationsMetric.textContent = completedCount.toLocaleString('es-BO');
            }
        }

        if (filterMonth) {
            filterMonth.value = selectedMonth;
        }
        if (filterYear) {
            filterYear.value = selectedYear;
        }
        if (filterSection) {
            filterSection.value = selectedSection;
        }
    }

    function initApp() {
        const state = loadState();
        initAuth(state);
        bindLoginForm(state);
        bindActions(state);
        bindHelpButtons();
        updateAuthUI(state);

        if (pageId === 'dashboard') {
            renderDashboard(state);
        }
        if (pageId === 'bm1') {
            renderBm1(state);
        }
        if (pageId === 'bm2') {
            renderBm2(state);
        }
        if (pageId === 'bm3') {
            renderBm3(state);
        }
        if (pageId === 'bm4') {
            renderBm4(state);
        }

        if (pageId === 'dashboard' || pageId === 'bm1' || pageId === 'bm2' || pageId === 'bm3' || pageId === 'bm4') {
            renderDashboard(state);
        }
    }

    document.addEventListener('DOMContentLoaded', initApp);
})();
