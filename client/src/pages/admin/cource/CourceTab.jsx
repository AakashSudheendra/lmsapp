import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourceMutation,
  useGetCourceByIdQuery,
} from "@/feautures/api/courceApi";
import { toast } from "sonner";

const CourceTab = () => {
  const isPublished = true;
  const navigate = useNavigate();
  const [editCource, { data, isLoading, isSuccess, error }] =
    useEditCourceMutation();
  const [input, setInput] = useState({
    courceTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courceLevel: "",
    courcePrice: "",
    courceThumbanil: "",
  });
  const params = useParams();
  const courceId = params.courceId;
  const { data: getCourceIdData, isLoading: getCourceIdLoading } =
    useGetCourceByIdQuery(courceId);
  const [previewThumbanil, setPreviewThumbanil] = useState("");
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourceLevel = (value) => {
    setInput({ ...input, courceLevel: value });
  };

  // getting file

  const selectThumbanil = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courceThumbanil: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbanil(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourceHandler = async () => {
    const formData = new FormData();
    formData.append("courceTitle", input.courceTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courceLevel", input.courceLevel);
    formData.append("courcePrice", input.courcePrice);
    formData.append("courceThumbanil", input.courceThumbanil);

    await editCource({ formData, courceId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Cource Updated .");
    }
    if (error) {
      toast.error(error.data.message || "Failed to Update Cource");
    }
  }, [isSuccess, error]);
  //useEffect for fetching the data after entering into edit section
  useEffect(() => {
    if (getCourceIdData?.cource) {
        const cource = getCourceIdData?.cource;
      setInput({
        courceTitle: cource.courceTitle,
        subTitle: cource.subTitle,
        description: cource.description,
        category: cource.category,
        courceLevel: cource.courceLevel,
        courcePrice: cource.courcePrice,
        courceThumbanil: cource.courceThumbanil,
      });
    }
  }, [courceId]);
  if(getCourceIdLoading) return <Loader2 className="h-4 w-4 animate-spin"/>
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Cource Information</CardTitle>
          <CardDescription>
            Make Changes to Your Cource Here.Clck Save when Your're Done
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "UnPublish" : "Publish"}
          </Button>
          <Button>Remove Cource</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courceTitle"
              value={input.courceTitle}
              onChange={changeEventHandler}
              placeholder="Ex. FullStack Developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Full Stack Developer from Zero to Hero"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select value={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Cource Level</Label>
              <Select
                value={input.courceLevel}
                onValueChange={selectCourceLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Cource Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cource Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="courcePrice"
                value={input.courcePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Cource Thumbanil</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-fit"
              onChange={selectThumbanil}
            />
            {previewThumbanil && (
              <img
                src={previewThumbanil}
                className="h-64 my-2"
                alt="CourceThumbanil"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/admin/cource")}>
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourceHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourceTab;
