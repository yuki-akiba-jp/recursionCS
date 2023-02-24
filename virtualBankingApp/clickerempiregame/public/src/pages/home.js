"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const fi_1 = require("react-icons/fi");
const LinkItems = [
    { name: "Home", icon: fi_1.FiHome },
    { name: "Trending", icon: fi_1.FiTrendingUp },
    { name: "Explore", icon: fi_1.FiCompass },
    { name: "Favourites", icon: fi_1.FiStar },
    { name: "Settings", icon: fi_1.FiSettings },
];
function SimpleSidebar({ children }) {
    const { isOpen, onOpen, onClose } = (0, react_2.useDisclosure)();
    return (<react_2.Box minH="100vh" bg={(0, react_2.useColorModeValue)("gray.100", "gray.900")}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }}/>
      <react_2.Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <react_2.DrawerContent>
          <SidebarContent onClose={onClose}/>
        </react_2.DrawerContent>
      </react_2.Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen}/>
      <react_2.Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </react_2.Box>
    </react_2.Box>);
}
exports.default = SimpleSidebar;
const SidebarContent = (_a) => {
    var { onClose } = _a, rest = __rest(_a, ["onClose"]);
    return (<react_2.Box bg={(0, react_2.useColorModeValue)("white", "gray.900")} borderRight="1px" borderRightColor={(0, react_2.useColorModeValue)("gray.200", "gray.700")} w={{ base: "full", md: 60 }} pos="fixed" h="full" {...rest}>
      <react_2.Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <react_2.Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </react_2.Text>
        <react_2.CloseButton display={{ base: "flex", md: "none" }} onClick={onClose}/>
      </react_2.Flex>
      {LinkItems.map((link) => (<NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>))}
    </react_2.Box>);
};
const NavItem = (_a) => {
    var { icon, children } = _a, rest = __rest(_a, ["icon", "children"]);
    return (<react_2.Link href="#" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <react_2.Flex align="center" p="4" mx="4" borderRadius="lg" role="group" cursor="pointer" _hover={{
            bg: "cyan.400",
            color: "white",
        }} {...rest}>
        {icon && (<react_2.Icon mr="4" fontSize="16" _groupHover={{
                color: "white",
            }} as={icon}/>)}
        {children}
      </react_2.Flex>
    </react_2.Link>);
};
const MobileNav = (_a) => {
    var { onOpen } = _a, rest = __rest(_a, ["onOpen"]);
    return (<react_2.Flex ml={{ base: 0, md: 60 }} px={{ base: 4, md: 24 }} height="20" alignItems="center" bg={(0, react_2.useColorModeValue)("white", "gray.900")} borderBottomWidth="1px" borderBottomColor={(0, react_2.useColorModeValue)("gray.200", "gray.700")} justifyContent="flex-start" {...rest}>
      <react_2.IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<fi_1.FiMenu />}/>

      <react_2.Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </react_2.Text>
    </react_2.Flex>);
};
