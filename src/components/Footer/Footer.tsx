"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white text-gray-700 border-t mt-10 border-gray-200 px-6 md:px-16 py-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-black text-white font-bold text-xl w-8 h-8 flex items-center justify-center rounded">
                            T
                        </div>
                        <span className="text-xl font-semibold">ShopMart</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Your one-stop destination for the latest technology, fashion, and lifestyle products.
                        Quality guaranteed with fast shipping and excellent customer service.
                    </p>

                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5" />
                            <span>123 Shop Street, Octoper City, DC 12345</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>(+20) 01093333333</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>support@shopmart.com</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3 uppercase tracking-wide">Shop</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#">Electronics</Link></li>
                        <li><Link href="#">Fashion</Link></li>
                        <li><Link href="#">Home & Garden</Link></li>
                        <li><Link href="#">Sports</Link></li>
                        <li><Link href="#">Deals</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3 uppercase tracking-wide">Customer Service</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#">Contact Us</Link></li>
                        <li><Link href="#">Help Center</Link></li>
                        <li><Link href="#">Track Your Order</Link></li>
                        <li><Link href="/returns">Returns & Exchanges</Link></li>
                        <li><Link href="#">Size Guide</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3 uppercase tracking-wide">About</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#">About ShopMart</Link></li>
                        <li><Link href="#">Careers</Link></li>
                        <li><Link href="#">Press</Link></li>
                        <li><Link href="#">Investor Relations</Link></li>
                        <li><Link href="#">Sustainability</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3 uppercase tracking-wide">Policies</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#">Privacy Policy</Link></li>
                        <li><Link href="#">Terms of Service</Link></li>
                        <li><Link href="#">Cookie Policy</Link></li>
                        <li><Link href="#">Shipping Policy</Link></li>
                        <li><Link href="#">Refund Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} ShopMart. All rights reserved.
            </div>
        </footer>
    );
}
