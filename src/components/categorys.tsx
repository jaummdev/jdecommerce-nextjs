import { Separator } from "./ui/separator";

export function Categorys() {

    return (
        <div className="w-full">
            <ul className="flex justify-center space-x-16 mb-6">
                <li>Man</li>
                <li>Women</li>
                <li>Kids</li>
                <li>Sports</li>
                <li>Brands</li>
                <li className="text-primary-green">New</li>
            </ul>

            <Separator orientation="horizontal" />
        </div>
    );
}