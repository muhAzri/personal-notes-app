export const translations = {
  id: {
    // Navigation
    'nav.notes': 'Catatan',
    'nav.archived': 'Arsip',
    'nav.add': 'Tambah',
    'nav.logout': 'Keluar',
    
    // Auth
    'auth.login': 'Masuk',
    'auth.register': 'Daftar',
    'auth.email': 'Email',
    'auth.password': 'Kata Sandi',
    'auth.confirmPassword': 'Konfirmasi Kata Sandi',
    'auth.name': 'Nama',
    'auth.loginTitle': 'Masuk ke Akun Anda',
    'auth.registerTitle': 'Buat Akun Baru',
    'auth.noAccount': 'Belum punya akun?',
    'auth.hasAccount': 'Sudah punya akun?',
    
    // Notes
    'notes.title': 'Judul',
    'notes.body': 'Isi catatan',
    'notes.add': 'Tambah Catatan',
    'notes.save': 'Simpan',
    'notes.delete': 'Hapus',
    'notes.archive': 'Arsipkan',
    'notes.unarchive': 'Batal Arsip',
    'notes.empty': 'Tidak ada catatan',
    'notes.emptyArchive': 'Tidak ada catatan yang diarsipkan',
    'notes.search': 'Cari catatan...',
    'notes.created': 'Dibuat pada',
    
    // Common
    'common.loading': 'Memuat...',
    'common.error': 'Terjadi kesalahan',
    'common.cancel': 'Batal',
    'common.confirm': 'Konfirmasi',
    'common.back': 'Kembali',
    
    // Theme
    'theme.light': 'Terang',
    'theme.dark': 'Gelap',
    'theme.toggle': 'Ubah Tema',
    
    // Language
    'language.id': 'Bahasa Indonesia',
    'language.en': 'English',
    'language.toggle': 'Ubah Bahasa',
    
    // 404 Page
    '404.title': 'Halaman Tidak Ditemukan',
    '404.description': 'Halaman yang Anda cari tidak ada atau telah dipindahkan. Mari kembali ke catatan Anda!',
    '404.goToNotes': 'Ke Catatan',
    '404.goBack': 'Kembali',
    '404.quickNav': 'Navigasi Cepat',
    '404.allNotes': 'Semua Catatan',
    '404.allNotesDesc': 'Lihat semua catatan Anda',
    '404.archived': 'Arsip',
    '404.archivedDesc': 'Catatan yang diarsipkan',
    '404.createNew': 'Buat Baru',
    '404.createNewDesc': 'Tambah catatan baru',
  },
  en: {
    // Navigation
    'nav.notes': 'Notes',
    'nav.archived': 'Archived',
    'nav.add': 'Add',
    'nav.logout': 'Logout',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.name': 'Name',
    'auth.loginTitle': 'Sign in to your account',
    'auth.registerTitle': 'Create a new account',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    
    // Notes
    'notes.title': 'Title',
    'notes.body': 'Note content',
    'notes.add': 'Add Note',
    'notes.save': 'Save',
    'notes.delete': 'Delete',
    'notes.archive': 'Archive',
    'notes.unarchive': 'Unarchive',
    'notes.empty': 'No notes available',
    'notes.emptyArchive': 'No archived notes',
    'notes.search': 'Search notes...',
    'notes.created': 'Created on',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    
    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.toggle': 'Toggle Theme',
    
    // Language
    'language.id': 'Bahasa Indonesia',
    'language.en': 'English',
    'language.toggle': 'Toggle Language',
    
    // 404 Page
    '404.title': 'Page Not Found',
    '404.description': "The page you're looking for doesn't exist or has been moved. Let's get you back to your notes!",
    '404.goToNotes': 'Go to Notes',
    '404.goBack': 'Go Back',
    '404.quickNav': 'Quick Navigation',
    '404.allNotes': 'All Notes',
    '404.allNotesDesc': 'View all your notes',
    '404.archived': 'Archived',
    '404.archivedDesc': 'Archived notes',
    '404.createNew': 'Create New',
    '404.createNewDesc': 'Add a new note',
  },
};

export type TranslationKey = keyof typeof translations.en;