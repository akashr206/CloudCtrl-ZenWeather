import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog";
import { Settings2 as Settings } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "./ui/button";
const SettingsDialog = () => {
    const {
        tempUnit,
        setTempUnit,
        windSpeedUnit,
        setWindSpeedUnit,
        pressureUnit,
        setPressureUnit,
    } = useSettings();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className={"rounded-full"}>
                    <Settings />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Change your preferences
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <p className="ml-3">Units</p>
                    <RadioGroup
                        value={tempUnit}
                        onValueChange={(value) => setTempUnit(value)}
                        className={"my-2 gap-1"}
                    >
                        <div
                            onClick={() => setTempUnit("celsius")}
                            className="flex items-center cursor-pointer hover:bg-card/80 transition-colors p-4 rounded-t-xl bg-card justify-between"
                        >
                            <Label htmlFor="r1">celsius</Label>
                            <RadioGroupItem value="celsius" id="r1" />
                        </div>
                        <div
                            onClick={() => setTempUnit("fahrenheit")}
                            className="flex items-center cursor-pointer hover:bg-card/80 transition-colors p-4 rounded-b-xl bg-card justify-between"
                        >
                            <Label htmlFor="r2">Fahrenheit</Label>
                            <RadioGroupItem value="fahrenheit" id="r2" />
                        </div>
                    </RadioGroup>
                    <p className="ml-3">Wind Speed</p>
                    <RadioGroup
                        defaultValue={windSpeedUnit}
                        value={windSpeedUnit}
                        onValueChange={(value) => setWindSpeedUnit(value)}
                        className={"my-2 gap-1"}
                    >
                        <div
                            onClick={() => setWindSpeedUnit("kmh")}
                            className="flex items-center cursor-pointer hover:bg-card/80 transition-colors p-4 rounded-t-xl bg-card justify-between"
                        >
                            <Label htmlFor="r1">km/h</Label>
                            <RadioGroupItem value="kmh" id="r1" />
                        </div>
                        <div
                            onClick={() => setWindSpeedUnit("mph")}
                            className="flex items-center cursor-pointer hover:bg-card/80 transition-colors p-4 rounded-b-xl bg-card justify-between"
                        >
                            <Label htmlFor="r2">mph</Label>
                            <RadioGroupItem value="mph" id="r2" />
                        </div>
                    </RadioGroup>
                    <p className="ml-3">Pressure</p>
                    <RadioGroup
                        defaultValue={pressureUnit}
                        value={pressureUnit}
                        onValueChange={(value) => setPressureUnit(value)}
                        className={"my-2 gap-1"}
                    >
                        <div
                            onClick={() => setPressureUnit("mbar")}
                            className="flex items-center cursor-pointer hover:bg-card/80 transition-colors p-4 rounded-t-xl bg-card justify-between"
                        >
                            <Label htmlFor="r1">mbar</Label>
                            <RadioGroupItem value="mbar" id="r1" />
                        </div>
                        <div
                            onClick={() => setPressureUnit("hPa")}
                            className="flex items-center cursor-pointer hover:bg-card/80 transition-colors p-4 rounded-b-xl bg-card justify-between"
                        >
                            <Label htmlFor="r2">hPa</Label>
                            <RadioGroupItem value="hPa" id="r2" />
                        </div>
                    </RadioGroup>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsDialog;
