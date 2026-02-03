import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfileInformationForm({
  isEditing,
}: {
  isEditing: boolean;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* first name */}
      <div className="space-y-2">
        <Label htmlFor="firstName">First name</Label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          defaultValue="Lawrence"
          placeholder="Enter your first name"
          className="rounded-full px-4 shadow-sm"
          disabled={!isEditing}
        />
      </div>

      {/* last name */}
      <div className="space-y-2">
        <Label htmlFor="lastName">Last name</Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          defaultValue="Dullo"
          placeholder="Enter your last name"
          className="rounded-full px-4 shadow-sm"
          disabled={!isEditing}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue="lawrencedullo04@gmail.com"
          placeholder="Enter your email"
          className="rounded-full px-4 shadow-sm"
          disabled
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="homeAddress">Home address</Label>
        <Input
          id="homeAddress"
          name="homeAddress"
          type="text"
          defaultValue="Caloocan City, Metro Manila"
          placeholder="Enter your home address"
          className="rounded-full px-4 shadow-sm"
          disabled={!isEditing}
        />
      </div>
    </div>
  );
}
