const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/categoryModel');
const MenuItem = require('./models/menuItemModel');
const User = require('./models/userModel');

dotenv.config();

const seed = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected! Cleaning existing data...');
        
        await Category.deleteMany();
        await MenuItem.deleteMany();
        await User.deleteMany();

        console.log('Creating categories...');
        const starters = await Category.create({ 
            name: 'Starters', 
            image: '/images/starters/paneer_tikka.jpg', 
            slug: 'starters' 
        });
        
        const mains = await Category.create({ 
            name: 'Main Courses', 
            image: '/images/mains/butter_chicken.png', 
            slug: 'main-courses' 
        });
        
        const desserts = await Category.create({ 
            name: 'Desserts', 
            image: '/images/desserts/gulab_jamun.png', 
            slug: 'desserts' 
        });
        
        const beverages = await Category.create({ 
            name: 'Beverages', 
            image: '/images/beverages/mango_lassi.png', 
            slug: 'beverages' 
        });

        const southIndian = await Category.create({
            name: 'South Indian Specials',
            image: '/images/south_indian/masala_dosa.png',
            slug: 'south-indian-specials'
        });

        const northIndian = await Category.create({
            name: 'North Indian Specials',
            image: '/images/north_indian/chole_bhature.png',
            slug: 'north-indian-specials'
        });

        console.log('Creating menu items (42 items total)...');
        
        // Starters (7 items)
        await MenuItem.create({
            name: 'Paneer Tikka',
            description: 'Char-grilled paneer cubes with onions, bell peppers, mint chutney, and lemon wedges.',
            price: 149,
            category: starters._id,
            image: '/images/starters/paneer_tikka.jpg',
            tags: ['V', 'GF'],
            ingredients: ['Cottage Cheese', 'Yogurt', 'Bell Peppers', 'Mint', 'Indian Spices'],
            isFeatured: true,
            rating: 4.8
        });

        await MenuItem.create({
            name: 'Chicken 65',
            description: 'Crispy deep-fried chicken tossed with curry leaves and green chilies.',
            price: 149,
            category: starters._id,
            image: '/images/starters/chicken_65.jpg',
            tags: ['GF'],
            ingredients: ['Chicken', 'Curry Leaves', 'Yogurt Marinated', 'Ginger-Garlic', 'Chili'],
            isFeatured: true,
            rating: 4.9
        });

        await MenuItem.create({
            name: 'Veg Manchurian Dry',
            description: 'Vegetable dumplings coated in glossy Indo-Chinese sauce with spring onions.',
            price: 119,
            category: starters._id,
            image: '/images/starters/veg_manchurian.jpg',
            tags: ['V'],
            ingredients: ['Mixed Vegetables', 'Soy Sauce', 'Spring Onion', 'Garlic', 'Corn Flour'],
            isFeatured: false,
            rating: 4.6
        });

        await MenuItem.create({
            name: 'Hara Bhara Kebab',
            description: 'Spinach and green pea patties served with mint chutney.',
            price: 99,
            category: starters._id,
            image: '/images/starters/hara_bhara_kebab.jpg',
            tags: ['V', 'GF'],
            ingredients: ['Spinach', 'Green Peas', 'Potatoes', 'Gram Flour', 'Mint Chutney'],
            isFeatured: false,
            rating: 4.5
        });

        await MenuItem.create({
            name: 'Crispy Corn',
            description: 'Golden fried corn kernels garnished with herbs and spices.',
            price: 99,
            category: starters._id,
            image: '/images/starters/crispy_corn.jpg',
            tags: ['V'],
            ingredients: ['Sweet Corn', 'Onion', 'Capsicum', 'Spices', 'Lemon Juice'],
            isFeatured: false,
            rating: 4.4
        });

        await MenuItem.create({
            name: 'Tandoori Chicken',
            description: 'Smoky red-marinated chicken with onion rings and mint chutney.',
            price: 149,
            category: starters._id,
            image: '/images/starters/tandoori_chicken.jpg',
            tags: ['GF'],
            ingredients: ['Chicken Bone-In', 'Tandoori Masala', 'Yogurt', 'Lemon', 'Mint Chutney'],
            isFeatured: true,
            rating: 4.8
        });

        await MenuItem.create({
            name: 'Gobi 65',
            description: 'Crispy cauliflower florets coated in spicy South Indian seasoning.',
            price: 109,
            category: starters._id,
            image: '/images/starters/gobi_65.jpg',
            tags: ['V', 'GF'],
            ingredients: ['Cauliflower', 'Rice Flour', 'South Indian Spices', 'Curry Leaves'],
            isFeatured: false,
            rating: 4.5
        });

        // Main Courses (7 items)
        await MenuItem.create({
            name: 'Butter Chicken',
            description: 'Creamy tomato-based curry with tender chicken pieces and butter swirl.',
            price: 149,
            category: mains._id,
            image: '/images/mains/butter_chicken.png',
            tags: ['GF'],
            ingredients: ['Chicken Tikka', 'Tomato Gravy', 'Cashew Paste', 'Butter', 'Fresh Cream'],
            isFeatured: true,
            rating: 4.9
        });

        await MenuItem.create({
            name: 'Paneer Butter Masala',
            description: 'Soft paneer cubes in rich orange gravy garnished with cream.',
            price: 139,
            category: mains._id,
            image: '/images/mains/paneer_butter_masala.png',
            tags: ['V', 'GF'],
            ingredients: ['Paneer Cubes', 'Butter', 'Cream', 'Onion-Tomato Puree', 'Cashews'],
            isFeatured: true,
            rating: 4.8
        });

        await MenuItem.create({
            name: 'Chicken Biryani',
            description: 'Aromatic basmati rice layered with chicken, saffron, fried onions, and herbs.',
            price: 149,
            category: mains._id,
            image: '/images/mains/chicken_biryani.png',
            tags: ['GF'],
            ingredients: ['Basmati Rice', 'Chicken', 'Saffron', 'Brown Onion', 'Mint', 'Kewra'],
            isFeatured: true,
            rating: 4.9
        });

        await MenuItem.create({
            name: 'Veg Biryani',
            description: 'Fragrant rice with colorful vegetables, mint, and whole spices.',
            price: 129,
            category: mains._id,
            image: '/images/mains/veg_biryani.png',
            tags: ['V', 'GF'],
            ingredients: ['Basmati Rice', 'Green Beans', 'Carrot', 'Green Peas', 'Saffron', 'Biryani Spices'],
            isFeatured: false,
            rating: 4.6
        });

        await MenuItem.create({
            name: 'Dal Makhani',
            description: 'Slow-cooked black lentils with butter and cream.',
            price: 119,
            category: mains._id,
            image: '/images/mains/dal_makhani.png',
            tags: ['V', 'GF'],
            ingredients: ['Black Urad Dal', 'Rajma', 'Butter', 'Cream', 'Tomato Paste', 'Slow Cooked'],
            isFeatured: false,
            rating: 4.7
        });

        await MenuItem.create({
            name: 'Kadai Paneer',
            description: 'Paneer with onions and bell peppers in spicy kadai masala.',
            price: 139,
            category: mains._id,
            image: '/images/mains/kadai_paneer.png',
            tags: ['V', 'GF'],
            ingredients: ['Paneer', 'Bell Peppers', 'Onions', 'Freshly Ground Kadai Masala', 'Coriander'],
            isFeatured: false,
            rating: 4.7
        });

        await MenuItem.create({
            name: 'Mutton Rogan Josh',
            description: 'Kashmiri-style mutton curry with deep red gravy.',
            price: 149,
            category: mains._id,
            image: '/images/mains/mutton_rogan_josh.png',
            tags: ['GF'],
            ingredients: ['Mutton Pieces', 'Rogan Josh Masala', 'Yogurt', 'Kashmiri Chili', 'Fennel'],
            isFeatured: true,
            rating: 4.8
        });

        // Desserts (7 items)
        await MenuItem.create({
            name: 'Gulab Jamun',
            description: 'Warm syrup-soaked dumplings garnished with pistachios.',
            price: 59,
            category: desserts._id,
            image: '/images/desserts/gulab_jamun.png',
            tags: ['V'],
            ingredients: ['Milk Solids (Khoya)', 'Sugar Syrup', 'Cardamom', 'Pistachio'],
            isFeatured: false,
            rating: 4.7
        });

        await MenuItem.create({
            name: 'Rasmalai',
            description: 'Soft cheese patties in saffron milk with almond and pistachio slivers.',
            price: 89,
            category: desserts._id,
            image: '/images/desserts/rasmalai.png',
            tags: ['V'],
            ingredients: ['Cottage Cheese Patties', 'Saffron Milk (Rabri)', 'Pistachio', 'Almonds'],
            isFeatured: true,
            rating: 4.9
        });

        await MenuItem.create({
            name: 'Gajar Ka Halwa',
            description: 'Carrot pudding topped with nuts and silver leaf.',
            price: 99,
            category: desserts._id,
            image: '/images/desserts/gajar_ka_halwa.png',
            tags: ['V'],
            ingredients: ['Grated Carrots', 'Milk', 'Ghee', 'Cashew', 'Almonds', 'Cardamom'],
            isFeatured: false,
            rating: 4.8
        });

        await MenuItem.create({
            name: 'Kaju Katli',
            description: 'Diamond-shaped cashew sweets arranged elegantly.',
            price: 149,
            category: desserts._id,
            image: '/images/desserts/kaju_katli.png',
            tags: ['V', 'GF'],
            ingredients: ['Cashew Powder', 'Sugar', 'Cardamom', 'Vark (Silver Leaf)'],
            isFeatured: false,
            rating: 4.6
        });

        await MenuItem.create({
            name: 'Kulfi',
            description: 'Traditional pistachio kulfi served with chopped nuts.',
            price: 79,
            category: desserts._id,
            image: '/images/desserts/kulfi.png',
            tags: ['V', 'GF'],
            ingredients: ['Condensed Milk', 'Saffron', 'Pistachios', 'Cardamom'],
            isFeatured: false,
            rating: 4.7
        });

        await MenuItem.create({
            name: 'Jalebi with Rabri',
            description: 'Crisp spirals served with thick creamy rabri.',
            price: 119,
            category: desserts._id,
            image: '/images/desserts/jalebi_with_rabri.png',
            tags: ['V'],
            ingredients: ['Fermented Batter', 'Sugar Syrup', 'Rabri (Condensed Milk)', 'Pistachio'],
            isFeatured: true,
            rating: 4.8
        });

        await MenuItem.create({
            name: 'Rasgulla',
            description: 'Soft white cottage cheese balls in sugar syrup.',
            price: 69,
            category: desserts._id,
            image: '/images/desserts/rasgulla.png',
            tags: ['V'],
            ingredients: ['Chhena (Cottage Cheese)', 'Light Sugar Syrup', 'Rose Water'],
            isFeatured: false,
            rating: 4.6
        });

        // Beverages (7 items)
        await MenuItem.create({
            name: 'Mango Lassi',
            description: 'Chilled mango yogurt drink with saffron and pistachio garnish.',
            price: 89,
            category: beverages._id,
            image: '/images/beverages/mango_lassi.png',
            tags: ['V', 'GF'],
            ingredients: ['Mango Pulp', 'Thick Yogurt', 'Sugar', 'Saffron', 'Pistachio'],
            isFeatured: true,
            rating: 4.8
        });

        await MenuItem.create({
            name: 'Masala Chai',
            description: 'Steaming spiced tea in an elegant cup.',
            price: 50,
            category: beverages._id,
            image: '/images/beverages/masala_chai.png',
            tags: ['V', 'GF'],
            ingredients: ['Tea Leaves', 'Milk', 'Ginger', 'Cardamom', 'Cloves', 'Cinnamon'],
            isFeatured: false,
            rating: 4.8
        });

        await MenuItem.create({
            name: 'South Indian Filter Coffee',
            description: 'Frothy filter coffee served in a traditional steel tumbler and dabarah.',
            price: 60,
            category: beverages._id,
            image: '/images/beverages/filter_coffee.png',
            tags: ['V', 'GF'],
            ingredients: ['Coffee Chicory Blend', 'Milk', 'Sugar', 'Filter Decoction'],
            isFeatured: false,
            rating: 4.9
        });

        await MenuItem.create({
            name: 'Fresh Lime Soda',
            description: 'Sparkling lime drink with mint and ice.',
            price: 69,
            category: beverages._id,
            image: '/images/beverages/fresh_lime_soda.png',
            tags: ['V', 'GF'],
            ingredients: ['Lime Juice', 'Soda Water', 'Mint Leaves', 'Ice', 'Sugar/Salt'],
            isFeatured: false,
            rating: 4.4
        });

        await MenuItem.create({
            name: 'Sweet Lassi',
            description: 'Creamy yogurt drink topped with saffron and nuts.',
            price: 79,
            category: beverages._id,
            image: '/images/beverages/sweet_lassi.png',
            tags: ['V', 'GF'],
            ingredients: ['Yogurt', 'Sugar', 'Saffron', 'Almonds', 'Cardamom'],
            isFeatured: false,
            rating: 4.5
        });

        await MenuItem.create({
            name: 'Rose Milk',
            description: 'Pastel pink milk beverage with rose petals.',
            price: 69,
            category: beverages._id,
            image: '/images/beverages/rose_milk.png',
            tags: ['V', 'GF'],
            ingredients: ['Chilled Milk', 'Rose Syrup', 'Sabja (Basil) Seeds', 'Rose Petals'],
            isFeatured: false,
            rating: 4.5
        });

        await MenuItem.create({
            name: 'Watermelon Juice',
            description: 'Vibrant fresh juice with mint garnish.',
            price: 79,
            category: beverages._id,
            image: '/images/beverages/watermelon_juice.png',
            tags: ['V', 'GF'],
            ingredients: ['Fresh Watermelon', 'Mint Leaves', 'Black Salt', 'Lemon Juice'],
            isFeatured: false,
            rating: 4.6
        });

        // South Indian Specials (7 items)
        await MenuItem.create({
            name: 'Masala Dosa',
            description: 'Golden crispy dosa served with potato filling, coconut chutney, and sambar.',
            price: 99,
            category: southIndian._id,
            image: '/images/south_indian/masala_dosa.png',
            tags: ['V', 'GF'],
            ingredients: ['Rice Batter', 'Potato Palya', 'Sambar', 'Coconut Chutney'],
            isFeatured: true,
            rating: 4.9
        });

        await MenuItem.create({
            name: 'Idli with Sambar',
            description: 'Fluffy idlis accompanied by sambar and assorted chutneys.',
            price: 59,
            category: southIndian._id,
            image: '/images/south_indian/idli_sambar.png',
            tags: ['V', 'GF'],
            ingredients: ['Steamed Rice Cakes', 'Sambar', 'Coconut Chutney', 'Tomato Chutney'],
            isFeatured: false,
            rating: 4.8
        });

        await MenuItem.create({
            name: 'Medu Vada',
            description: 'Crisp lentil doughnuts served with coconut chutney and sambar.',
            price: 69,
            category: southIndian._id,
            image: '/images/south_indian/medu_vada.png',
            tags: ['V'],
            ingredients: ['Urad Dal Batter', 'Mustard Seeds', 'Curry Leaves', 'Ginger', 'Sambar'],
            isFeatured: false,
            rating: 4.7
        });

        await MenuItem.create({
            name: 'Pesarattu',
            description: 'Green gram dosa folded neatly with chutneys.',
            price: 109,
            category: southIndian._id,
            image: '/images/south_indian/pesarattu.png',
            tags: ['V', 'GF'],
            ingredients: ['Whole Moong Dal Batter', 'Ginger', 'Green Chili', 'Allam (Ginger) Chutney'],
            isFeatured: false,
            rating: 4.6
        });

        await MenuItem.create({
            name: 'Appam with Vegetable Stew',
            description: 'Soft lace-edged appam paired with creamy vegetable stew.',
            price: 139,
            category: southIndian._id,
            image: '/images/south_indian/appam_stew.png',
            tags: ['V', 'GF'],
            ingredients: ['Fermented Rice & Coconut Appam', 'Vegetables', 'Coconut Milk Gravy'],
            isFeatured: true,
            rating: 4.8
        });

        await MenuItem.create({
            name: 'Ven Pongal',
            description: 'Savory rice-lentil dish topped with ghee, cashews, and pepper.',
            price: 89,
            category: southIndian._id,
            image: '/images/south_indian/ven_pongal.png',
            tags: ['V', 'GF'],
            ingredients: ['Rice', 'Moong Dal', 'Ghee', 'Cashews', 'Black Pepper', 'Ginger'],
            isFeatured: false,
            rating: 4.7
        });

        await MenuItem.create({
            name: 'Uttapam',
            description: 'Thick savory pancake topped with onions, tomatoes, and coriander.',
            price: 99,
            category: southIndian._id,
            image: '/images/south_indian/uttapam.png',
            tags: ['V', 'GF'],
            ingredients: ['Rice Lentil Batter', 'Onion', 'Tomato', 'Coriander', 'Green Chili'],
            isFeatured: false,
            rating: 4.5
        });

        // North Indian Specials (7 items)
        await MenuItem.create({
            name: 'Chole Bhature',
            description: 'Fluffy bhature served with spicy chickpea curry and onions.',
            price: 129,
            category: northIndian._id,
            image: '/images/north_indian/chole_bhature.png',
            tags: ['V'],
            ingredients: ['Fried Leavened Bread', 'Spicy Chickpea Curry', 'Onion Rings', 'Pickle'],
            isFeatured: true,
            rating: 4.9
        });

        await MenuItem.create({
            name: 'Rajma Chawal',
            description: 'Kidney bean curry served with steamed rice.',
            price: 119,
            category: northIndian._id,
            image: '/images/north_indian/rajma_chawal.png',
            tags: ['V', 'GF'],
            ingredients: ['Red Kidney Beans', 'Basmati Rice', 'Ghee', 'Whole Spices'],
            isFeatured: false,
            rating: 4.7
        });

        await MenuItem.create({
            name: 'Amritsari Kulcha',
            description: 'Stuffed kulcha with chole, butter, and pickle.',
            price: 139,
            category: northIndian._id,
            image: '/images/north_indian/amritsari_kulcha.png',
            tags: ['V'],
            ingredients: ['Stuffed Spiced Potato Naan', 'Chole Curry', 'White Butter', 'Imli Chutney'],
            isFeatured: true,
            rating: 4.8
        });

        await MenuItem.create({
            name: 'Palak Paneer',
            description: 'Paneer cubes in vibrant spinach gravy with cream drizzle.',
            price: 139,
            category: northIndian._id,
            image: '/images/north_indian/palak_paneer.png',
            tags: ['V', 'GF'],
            ingredients: ['Cottage Cheese', 'Spinach Puree', 'Cream', 'Garlic', 'Green Chili'],
            isFeatured: false,
            rating: 4.7
        });

        await MenuItem.create({
            name: 'Dal Tadka',
            description: 'Yellow lentils tempered with cumin, garlic, and red chilies.',
            price: 109,
            category: northIndian._id,
            image: '/images/north_indian/dal_tadka.png',
            tags: ['V', 'GF'],
            ingredients: ['Yellow Lentils', 'Cumin Seeds', 'Garlic', 'Dry Red Chilies', 'Ghee'],
            isFeatured: false,
            rating: 4.6
        });

        await MenuItem.create({
            name: 'Malai Kofta',
            description: 'Fried dumplings in creamy cashew gravy.',
            price: 149,
            category: northIndian._id,
            image: '/images/north_indian/malai_kofta.png',
            tags: ['V', 'GF'],
            ingredients: ['Potato-Paneer Kofta', 'Rich Cashew Gravy', 'Cream', 'Saffron'],
            isFeatured: true,
            rating: 4.8
        });

        await MenuItem.create({
            name: 'Butter Naan',
            description: 'Soft butter-brushed naan served elegantly with curry accompaniments.',
            price: 50,
            category: northIndian._id,
            image: '/images/north_indian/butter_naan.png',
            tags: ['V'],
            ingredients: ['Refined Wheat Flour', 'Yogurt', 'Butter Melted'],
            isFeatured: false,
            rating: 4.7
        });

        console.log('Creating admin user...');
        await User.create({
            name: 'Admin User',
            email: 'admin@test.com',
            password: 'password123',
            role: 'admin'
        });

        console.log('🎉 Database Seeded Successfully!');
        process.exit(0);
    } catch (e) {
        console.error('❌ Error Seeding Database:', e);
        process.exit(1);
    }
};

seed();
