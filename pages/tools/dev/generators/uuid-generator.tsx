"use client";

import { CustomRadio } from "@/components/custom-radio";
import DefaultLayout from "@/layouts/default";
import { RadioGroup,Radio } from "@nextui-org/react";
import { title, subtitle } from "@/components/primitives";
import { useState } from "react";
export default function UUIdGenerator() {
    const defaultChecked = 4;
    const [selectedVersion, setSelectedVersion] = useState(defaultChecked);
    return (
        
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title()}>UUID Generator</h1>
                    <h4 className={subtitle({ class: "mt-4" })}>
                        Generate UUIDs with different versions. 
                    </h4>
				</div>

                <RadioGroup
      label=""
      orientation="horizontal"
    >
      {[...Array(7)].map((val,i)=><Radio key={i} value={i+''} checked={i===defaultChecked}>Version {i}</Radio>)}
    </RadioGroup>
        </section>
        </DefaultLayout>
    );
}