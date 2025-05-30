// frontend/src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Container,
    useTheme,
    Menu,
    MenuItem
} from '@mui/material';
import { Menu as MenuIcon, Person as PersonIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [adminMenuAnchor, setAdminMenuAnchor] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAdminMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAdminMenuAnchor(event.currentTarget);
    };

    const handleAdminMenuClose = () => {
        setAdminMenuAnchor(null);
    };

    const handleNavigation = (path: string) => {
        // Cerrar menús
        setMobileOpen(false);
        handleAdminMenuClose();

        // Si el path contiene un hash (#), es una navegación a una sección
        if (path.includes('#')) {
            // Extraer el ID de sección del path
            const sectionId = path.split('#')[1];

            // Si estamos en la página principal, hacer scroll suave
            if (window.location.pathname === '/' || window.location.pathname === '') {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
            }
        }

        // Si no se cumple lo anterior, navegar normalmente
        navigate(path);
    };

    const navItems = [
        { text: 'Inicio', path: '/' },
        { text: 'Películas', path: '/#peliculas' },
        { text: 'Mis Reservas', path: '/reservations' },
    ];

    const adminItems = [
        { text: 'Administrar Butacas', path: '/admin/seats' },
        { text: 'Administrar Cartelera', path: '/admin/billboard' },
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
                CineReservas
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: 'center' }}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary="Administración" />
                    </ListItemButton>
                </ListItem>
                {adminItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ pl: 2 }}>
                        <ListItemButton
                            sx={{ textAlign: 'center' }}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary="Iniciar Sesión" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            component={RouterLink}
                            to="/"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 'bold',
                                color: 'white',
                                textDecoration: 'none'
                            }}
                        >
                            CineReservas
                        </Typography>

                        {/* Desktop menu */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.text}
                                    color="inherit"
                                    sx={{ mx: 1 }}
                                    onClick={() => handleNavigation(item.path)}
                                >
                                    {item.text}
                                </Button>
                            ))}
                            <Button
                                color="inherit"
                                onClick={handleAdminMenuOpen}
                                endIcon={<ExpandMoreIcon />}
                                sx={{ mx: 1 }}
                            >
                                Administración
                            </Button>
                            <Menu
                                id="admin-menu"
                                anchorEl={adminMenuAnchor}
                                open={Boolean(adminMenuAnchor)}
                                onClose={handleAdminMenuClose}
                                MenuListProps={{
                                    'aria-labelledby': 'admin-button',
                                }}
                            >
                                {adminItems.map((item) => (
                                    <MenuItem
                                        key={item.text}
                                        onClick={() => handleNavigation(item.path)}
                                    >
                                        {item.text}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <Button
                                variant="outlined"
                                color="inherit"
                                startIcon={<PersonIcon />}
                                sx={{ ml: 2 }}
                                onClick={() => handleNavigation('/reservations')}
                            >
                                Mis Reservas
                            </Button>
                        </Box>

                        {/* Mobile menu toggle */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            sx={{ display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 280,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Navbar;